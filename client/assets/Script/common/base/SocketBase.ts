import { SocketType } from "../Game";
import { SocketMsgStruct } from "../manager/NetManager";
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
    socket:WebSocket
    msgCallBackList:{[key:string]:socketCallBack[]}
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
            msgData:{md5:this.md5}
        })
        this.socket.send(buffer);
    }
    startHeartBeat(){
        
    }
    onMessage(buffer){
        let msg = game.protoMgr.decode(buffer);
        if(msg.msgType == MSG_TYPE.HANDSHAKE){
            game.protoMgr.setMsgCodeList(msg.msgData.route)
            this.heartbeat = msg.msgData.heartbeat
            this.state = SOCKET_STATE.READY
            this.dispatchMsgEvent("onReady");
            this.startHeartBeat();
        }else if(msg.msgType == MSG_TYPE.HEARTBEAT){

        }else if(msg.msgType == MSG_TYPE.MSG){
            this._runCallBackList(msg);
            this.dispatchMsgEvent(msg.msgHead,msg.msgData);
        }
    }
    onMsgHander(msgName:string,callBack:(any)=>void,target:cc.Component){
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
    send(data:SocketMsgStruct,callBack?:()=>void){
        if(this.state != SOCKET_STATE.READY){
            game.logMgr.error("socket:% state is %d",this.socketType,this.state);
            return;
        }
        this.socket.send(game.protoMgr.encode(data));
        this._pushInCallBackList(data,callBack);
    }
    dispatchMsgEvent(msgName,data?){
        game.eventMgr.dispatch(this.socketType+"OnMsg"+msgName,data);
    }
    _pushInCallBackList(data:SocketMsgStruct,callBack?:()=>void){
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
        this.msgCallBackList = {};
        this.socket.close();
        this.socket = null;
        this.state = SOCKET_STATE.OFFLINE
        game.timeMgr.scheduleOnce(()=>{
            this.connect();
        },1);
    }
}