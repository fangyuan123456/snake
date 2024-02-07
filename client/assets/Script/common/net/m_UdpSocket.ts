import { CompBase } from "../base/CompBase";
import { I_msg, MSG_TYPE } from "../interface/I_Common";
import { SocketBase } from "./SocketBase"

export class m_UdpSocket extends SocketBase{
    createSocket(){
        return  game.platFormMgr!.createUdpSocket(this.ip);
    }
    registerCallBack(){
        this.socket.onmessage = this.onMessage.bind(this);
    }
    connect(): void {
        super.connect();
        this.onOpen();
    }
    handshake(): void {
        this.send({
            msgType:MSG_TYPE.handshake,
            msgHead:"",
            msgData:{md5:this.md5,uid:game.userData.uid}
        },null,null,true)
    }
    startHeartBeat(): void {}
    private sendNeedCallBackData(data:I_msg,callBack?:(data:any)=>void){
        let sendFunc = null;
        let funcCallBack = null;
        sendFunc = ()=>{
            this.send(data,funcCallBack);
        }
        funcCallBack = (data:any)=>{
            game.timeMgr.unSchedule(sendFunc)
            if(callBack){
                callBack(data);
            }
        }
        sendFunc();
        game.timeMgr.scheduleOnce(sendFunc,0.1);
    }
    send(data: I_msg, callBack?: (data: any) => void,target?:CompBase,isNeedCallBack?:boolean): void {
        if(isNeedCallBack){
            this.sendNeedCallBackData(data,callBack);
        }else{
            super.send(data,callBack);
        }
    }
}