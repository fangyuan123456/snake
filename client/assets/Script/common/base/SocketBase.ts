import { SocketType } from "../Game";
import { SocketMsgStruct } from "../manager/NetManager";
import { CompBase } from "./CompBase";
enum SOCKET_STATE{
    OFFLINE,
    CONNECTING,
    ONLINE,
    READY
}
export enum MSG_TYPE{
    MSG = 1,
    HANDSHAKE,
    HEARTBEAT
}
type  socketCallBack=(any)=>void
export class SocketBase{
    state:SOCKET_STATE = SOCKET_STATE.OFFLINE
    socketType:SocketType
    ip:string
    md5:string = ""
    heartbeat:number = 0
    heartbeatTimer:NodeJS.Timeout
    heartbeatResTimeoutTimer:NodeJS.Timeout
    socket:WebSocket
    msgCallBackList:{[key:string]:socketCallBack[]} = {}
    constructor(socketType:SocketType,ip:string){
        this.socketType = socketType;
        this.ip = ip;
        this.connect();
    }
    connect(){
        if(this.socket && this.state==SOCKET_STATE.OFFLINE){
            this.close();
        }
        this.socket = game.platFormMgr.createSocket(this.ip);
        this.registerCallBack();
    }
    registerCallBack(){
        this.socket.onopen = this.onOpen.bind(this);
        this.socket.onmessage = this.onMessage.bind(this);
        this.socket.onerror = this.onError.bind(this);
        this.socket.onclose = this.onClose.bind(this);
    }
    onOpen(){
        game.logMgr.debug("onOpen");
        this.state = SOCKET_STATE.ONLINE
        this.dispatchMsgEvent("onOpen");
        this.handshake();
    }
    handshake(){
        let buffer = game.protoMgr.encode({
            msgType:MSG_TYPE.HANDSHAKE,
            msgHead:"",
            msgData:{md5:this.md5,uid:game.userData.uid}
        })
        this.socket.send(buffer);
    }
    startHeartBeat() {
        clearInterval(this.heartbeatTimer);
        let sendHeartbeat = ()=>{
            // 心跳
            let buffer = game.protoMgr.encode({
                msgType:MSG_TYPE.HEARTBEAT,
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
        if (this.heartbeat > 0) {
            this.heartbeatTimer = setInterval(sendHeartbeat, this.heartbeat);
        }
 
    }
    onMessage(event){
        let buffer = new Uint8Array(event.data);
        let num = 0;
        while(buffer.length>0){
            let msgLen = (buffer[0] << 24) | (buffer[1] << 16) | (buffer[2] << 8) | buffer[3];
            let msgBuffer = buffer.slice(0,msgLen+4);
            let msg = game.protoMgr.decode(msgBuffer);
            game.logMgr.debug("onMessage:"+JSON.stringify(msg));
            if(msg.msgType == MSG_TYPE.HANDSHAKE){
                game.protoMgr.setMsgCodeList(msg.msgData.route)
                this.heartbeat = msg.msgData.heartbeat
                this.state = SOCKET_STATE.READY
                this.dispatchMsgEvent("onReady");
                this.startHeartBeat();
            }else if(msg.msgType == MSG_TYPE.HEARTBEAT){
                clearTimeout(this.heartbeatResTimeoutTimer);
                this.heartbeatResTimeoutTimer = null;
            }else if(msg.msgType == MSG_TYPE.MSG){
                this._runCallBackList(msg);
                this.dispatchMsgEvent(msg.msgHead,msg.msgData);
            }
            buffer = buffer.slice(msgLen+4)
            num++;
            if(num>10){
                break;
            }
        }
    }
    onMsgHander(msgName:string,callBack:(any)=>void,target?:CompBase){
        game.eventMgr.on(this.socketType+"OnMsg"+msgName,callBack,target);
    }
    onError(){
        this.close();
        this.dispatchMsgEvent("onError");
    }
    onClose(){
        this.close();
        this.dispatchMsgEvent("onClose");
    }
    send(data:SocketMsgStruct,callBack?:(data:any)=>void){
        data.msgData = data.msgData || {};
        if(this.state != SOCKET_STATE.READY){
            game.logMgr.error("socket:% state is %d",this.socketType,this.state);
            return;
        }
        game.logMgr.debug("sendMsg:"+JSON.stringify(data));
        this.socket.send(game.protoMgr.encode(data));
        this._pushInCallBackList(data,callBack);
    }
    dispatchMsgEvent(msgName,data?){
        game.eventMgr.dispatch(this.socketType+"OnMsg"+msgName,data);
    }
    _pushInCallBackList(data:SocketMsgStruct,callBack?:(data:any)=>void){
        if(callBack){
            this.msgCallBackList[data.msgHead] = this.msgCallBackList[data.msgHead] || [];
            this.msgCallBackList[data.msgHead].push(callBack);
        }
    }
    _runCallBackList(data:SocketMsgStruct){
        let callList = this.msgCallBackList[data.msgHead];
        if(callList){
            for(let i in callList){
                callList[i](data.msgData);
            }
            delete this.msgCallBackList[data.msgHead]
        }
    }
    close(){
        clearInterval(this.heartbeatTimer);
        this.socket.close();
        this.socket = null;
        this.state = SOCKET_STATE.OFFLINE
        game.timeMgr.scheduleOnce(()=>{
            this.connect();
        },1);
    }
}