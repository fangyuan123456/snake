import { SocketType } from "../Game";
import { CompBase } from "../base/CompBase";
import { Dic, I_msg, MSG_TYPE } from "../interface/I_Common";
enum SOCKET_STATE{
    OFFLINE,
    CONNECTING,
    ONLINE,
    READY
}
type  socketCallBack=(any)=>void
export class SocketBase{
    private delaySocketMsgMap:Dic<{callBack?:()=>void}> = {}
    state:SOCKET_STATE = SOCKET_STATE.OFFLINE
    socketType:SocketType
    ip:string
    md5:string = ""
    heartbeat:number = 0
    heartbeatTimer:NodeJS.Timeout
    heartbeatResTimeoutTimer:NodeJS.Timeout
    socket:any
    msgCallBackList:{[key:string]:socketCallBack[]} = {}
    isNeedReConnect:boolean = true
    constructor(socketType:SocketType,ip:string){
        this.socketType = socketType;
        this.ip = ip;
        this.connect();
    }
    connect(){
        if(this.state==SOCKET_STATE.OFFLINE){
            this.state=SOCKET_STATE.CONNECTING
            this.socket = this.createSocket();
            this.registerCallBack();
        }
    }
    createSocket(){
    }
    registerCallBack(){
    }
    onOpen(){
        game.logMgr.debug(this.socketType+"onOpen");
        this.state = SOCKET_STATE.ONLINE
        this.dispatchMsgEvent("onOpen");
        this.handshake();
    }
    handshake(){
        let msgData:{md5:string,uid:number,roomId?:number} = {md5:this.md5,uid:game.userData.uid};
        if(this.socketType == SocketType.game){
            let roomInfo = game.gameData.getRoomInfoSync();
            msgData = {md5:this.md5,uid:game.userData.uid,roomId:roomInfo.roomId}
        }
        this.send({
            msgType:MSG_TYPE.handshake,
            msgHead:"",
            msgData:msgData
        })
    }
    startHeartBeat() {
        if (this.heartbeat > 0) {
            clearInterval(this.heartbeatTimer);
            let sendHeartbeat = ()=>{
                let buffer = game.protoMgr.encode({
                    msgType:MSG_TYPE.heartbeat,
                    msgHead:"",
                    msgData:""
                })
                this.socket.send(buffer);
            
                if (this.heartbeatResTimeoutTimer === null) {
                    this.heartbeatResTimeoutTimer = setTimeout(function () {
                        this.close();
                    },this.heartbeat);
                }
            }
            this.heartbeatTimer = setInterval(sendHeartbeat, this.heartbeat);
        }
    }
    onMessage(bufferData:ArrayBuffer){
        let buffer = new Uint8Array(bufferData);
        let num = 0;
        while(buffer.length>0){
            let msgLen = (buffer[0] << 24) | (buffer[1] << 16) | (buffer[2] << 8) | buffer[3];
            let msgBuffer = buffer.slice(0,msgLen+4);
            let msg = game.protoMgr.decode(msgBuffer);
            game.logMgr.debug(this.socketType+"onMessage:"+JSON.stringify(msg));
            if(msg.msgType == MSG_TYPE.handshake){
                game.protoMgr.setMsgCodeList(msg.msgData.route)
                this.heartbeat = msg.msgData.heartbeat
                this.state = SOCKET_STATE.READY
                this.dispatchMsgEvent("onReady");
                this.startHeartBeat();
            }else if(msg.msgType == MSG_TYPE.heartbeat){
                clearTimeout(this.heartbeatResTimeoutTimer);
                this.heartbeatResTimeoutTimer = null;
            }else if(msg.msgType == MSG_TYPE.msg){
                this.onMessageData(msg);
            }
            buffer = buffer.slice(msgLen+4)
            num++;
            if(num>10){
                break;
            }
        }
    }
    onMessageData(msg){
        let callBack = ()=>{
            this.runCallBackList(msg);
            this.dispatchMsgEvent(msg.msgHead,msg.msgData);
        }
        if(this.delaySocketMsgMap[msg.msgHead]){
            this.delaySocketMsgMap[msg.msgHead].callBack = ()=>{
                callBack();
            }
        }else{
            callBack();
        }
    }
    delaySocketMsg(msgName:string,delayTime:number){
        this.delaySocketMsgMap[msgName] = {};
        game.timeMgr.scheduleOnce(()=>{
            let callBack = this.delaySocketMsgMap[msgName].callBack
            if(callBack){
                callBack();
            }
            delete this.delaySocketMsgMap[msgName];
        },delayTime)
    }
    onError(){
        game.logMgr.debug(this.socketType+"onError");
        this.close();
        this.dispatchMsgEvent("onError");
    }
    onClose(){
        game.logMgr.debug(this.socketType+"onClose");
        this.close();
        this.dispatchMsgEvent("onClose");
    }
    send(data:I_msg,callBack?:(data:any)=>void){
        data.msgData = data.msgData || {};
        if(data.msgType == MSG_TYPE.msg && this.state != SOCKET_STATE.READY){
            game.logMgr.error("socket:% state is %d",this.socketType,this.state);
            return;
        }
        game.logMgr.debug(this.socketType+"sendMsg:"+JSON.stringify(data));
        this.socket.send(game.protoMgr.encode(data));
        this.pushInCallBackList(data,callBack);
    }
    dispatchMsgEvent(msgName,data?){
        game.eventMgr.dispatch(this.socketType+"OnMsg"+msgName,data);
    }
    onMsgEvent(msgName:string,callBack:(any)=>void,target?:CompBase){
        game.eventMgr.on(this.socketType+"OnMsg"+msgName,callBack,target);
    }
    pushInCallBackList(data:I_msg,callBack?:(data:any)=>void){
        if(callBack){
            this.msgCallBackList[data.msgHead] = this.msgCallBackList[data.msgHead] || [];
            this.msgCallBackList[data.msgHead].push(callBack);
        }
    }
    runCallBackList(data:I_msg){
        let callList = this.msgCallBackList[data.msgHead];
        if(callList){
            for(let i in callList){
                callList[i](data.msgData);
            }
            delete this.msgCallBackList[data.msgHead]
        }
    }
    close(isNotReConnect:boolean = false){
        if(this.socket){
            this.socket.close();
            this.socket = null;
        }
        if(!isNotReConnect && this.isNeedReConnect){
            game.timeMgr.scheduleOnce(()=>{
                this.connect();
            },1);
        }
        clearInterval(this.heartbeatTimer);
        clearTimeout(this.heartbeatResTimeoutTimer);
        this.heartbeatResTimeoutTimer = null;
        this.state = SOCKET_STATE.OFFLINE
    }
}