import { SocketMsgStruct } from "../manager/NetManager";
enum SOCKET_STATE{
    OFFLINE,
    ONLINE,
    CONNECTING
}
type  socketCallBack=(any)=>void
export class SocketBase{
    state:SOCKET_STATE = SOCKET_STATE.OFFLINE
    name:string
    ip:string
    socket:WebSocket
    msgCallBackList:{[key:string]:socketCallBack[]}
    constructor(name:string,ip:string){
        this.name = name;
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
        this.state = SOCKET_STATE.ONLINE
    }
    onMessage(buffer){
        let msg = game.protoMgr.decode(buffer);
        let callList = this.msgCallBackList[msg.msgHead];
        if(callList){
            for(let i in callList){
                callList[i](msg.msgData);
            }
            delete this.msgCallBackList[msg.msgHead]
        }
        game.eventMgr.dispatch("OnMsg"+msg.msgHead,msg.msgData);
    }
    onError(){
        this.close();
    }
    onClose(){
        this.close();
    }
    send(data:SocketMsgStruct,callBack?:()=>void){
        if(this.state != SOCKET_STATE.ONLINE){
            game.logMgr.error("socket:% state is %d",this.name,this.state);
            return;
        }
        this._pushInCallBackList(data,callBack);;
    }
    _pushInCallBackList(data:SocketMsgStruct,callBack?:()=>void){
        if(callBack){
            this.msgCallBackList[data.msgHead] = this.msgCallBackList[data.msgHead] || [];
            this.msgCallBackList[data.msgHead].push(callBack);
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