import { SocketType } from "../Game";
import { SocketMsgStruct } from "../manager/NetManager";
import { CompBase } from "../base/CompBase";
export enum MSG_TYPE{
    MSG = 1
}
type  socketCallBack=(any)=>void
export class m_UdpSocket{
    socketType:SocketType
    ip:string
    md5:string = ""
    socket:any
    isUdp:boolean
    msgCallBackList:{[key:string]:socketCallBack[]} = {}
    constructor(socketType:SocketType,ip:string){
        this.socketType = socketType;
        this.ip = ip;
        this.connect();
    }
    connect(){
        this.socket = game.platFormMgr!.createUdpSocket(this.ip);
        this.registerCallBack();
    }
    registerCallBack(){
        this.socket.onmessage = this.onMessage.bind(this);
    }
    onMessage(event){
        let buffer = new Uint8Array(event.data);
        let num = 0;
        while(buffer.length>0){
            let msgLen = (buffer[0] << 24) | (buffer[1] << 16) | (buffer[2] << 8) | buffer[3];
            let msgBuffer = buffer.slice(0,msgLen+4);
            let msg = game.protoMgr.decode(msgBuffer);
            game.logMgr.debug("onMessage:"+JSON.stringify(msg));
            this._runCallBackList(msg);
            this.dispatchMsgEvent(msg.msgHead,msg.msgData);
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
    send(data:SocketMsgStruct,callBack?:(data:any)=>void){
        data.msgData = data.msgData || {};
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
        this.socket.close();
    }
}