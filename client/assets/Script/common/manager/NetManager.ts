import { json } from "express";
import { SocketType } from "../Game";
import { CompBase } from "../base/CompBase";
import { SingleBase } from "../base/SingleBase";
import { ServerCfg } from "../configs/ServerCfg";
import { I_msg } from "../interface/I_Common";
import { SocketBase } from "../net/SocketBase";
import { m_UdpSocket } from "../net/m_UdpSocket";
import { m_WebSocket } from "../net/m_WebSocket";
import { MsgReciver } from "../net/MsgReciver";
export class NetManager extends SingleBase{
    showLoadTimes:number = 0
    socketMap:{[key:string]:SocketBase} = {}
    private msgReciver:MsgReciver
    constructor(){
        super();
        game.timeMgr.scheduleOnce(()=>{
            this.init();
        },0)
    }
    init(){
        this.msgReciver = MsgReciver.getInstance();
    }
    sendHttpRequest(data:any,className:string,_callBack:(data:any)=>void,_fileCallback?:()=>void,retryTime:number = -1,_isShowLoading = true){
        let msgData = {
            msgHead:className,
            msgData:data,
            url:data.url || ServerCfg.httpUrl
        }
        var that=this;
        if(_isShowLoading){
            this.showNetLoadingBar(true);
        }
         game.platFormMgr.sendHttpRequest(msgData,(data)=>{
            if(_callBack){
                _callBack(data);
            }
            if(_isShowLoading){
                that.showNetLoadingBar(false);
            }
         },function(){
            if(_isShowLoading){
                that.showNetLoadingBar(false);
            }
            if(retryTime){
                if(retryTime>0){
                    retryTime--;
                }
                game.timeMgr.scheduleOnce(()=>{
                    that.sendHttpRequest(data,className,_callBack,_fileCallback,retryTime,_isShowLoading);
                },0.5)
            }else{
                if(_fileCallback)_fileCallback()
            }
         })
    }
    sendSocket(data:I_msg,callBack?:(data:any)=>void,target?:CompBase,socketType:SocketType = SocketType.center){
        if(!this.socketMap[socketType]){
            game.logMgr.error("socketName:%s is not find",socketType);
            return;
        }
        this.socketMap[socketType].send(data,callBack);
    }
    createSocket(ip:string,socketType:SocketType = SocketType.center,isUdp:boolean = false){
        if(this.socketMap[socketType]){
            return;
        }
        if(isUdp && game.platFormMgr.isSupportUdp){
            let addressArr = ip.split(":");
            ip = addressArr[0]+":"+Number(addressArr[1])+1;
            this.socketMap[socketType] = new m_UdpSocket(socketType,ip);
        }else{
            this.socketMap[socketType] = new m_WebSocket(socketType,ip);
        }
    }
    closeAndDestroySocket(socketType:SocketType = SocketType.center){
        game.logMgr.debug(socketType+"主动断开不要重连")
        if(this.socketMap[socketType]){
            this.socketMap[socketType].close(true);
            delete this.socketMap[socketType];
        }
    }
    onOpen(callBack:(any)=>void,target?:CompBase,socketType:SocketType = SocketType.center){
        this.onMsg("onOpen",callBack,target,socketType);
    }
    onReady(callBack:(any)=>void,target?:CompBase,socketType:SocketType = SocketType.center){
        game.logMgr.debug(socketType+"注册OnReady")
        this.onMsg("onReady",callBack,target,socketType);
    }
    onClose(callBack:(any)=>void,target?:CompBase,socketType:SocketType = SocketType.center){
        this.onMsg("onClose",callBack,target,socketType);
    }
    onMsg(msgName:string,callBack:(any)=>void,target?:CompBase,socketType:SocketType = SocketType.center){
        game.eventMgr.on(socketType+"OnMsg"+msgName,callBack,target);
    }
    delaySocketMsg(msgName:string,delayTime:number,socketType:SocketType = SocketType.center){
        this.socketMap[socketType].delaySocketMsg(msgName,delayTime);
    }
    showNetLoadingBar(_b){
        if(_b){
            this.showLoadTimes++
        }else{
            this.showLoadTimes--;
        }
    }
}