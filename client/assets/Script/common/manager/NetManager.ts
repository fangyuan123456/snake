import { SocketType } from "../Game";
import { CompBase } from "../base/CompBase";
import { SingleBase } from "../base/SingleBase";
import { MSG_TYPE, SocketBase } from "../base/SocketBase";
import { ServerCfg } from "../configs/ServerCfg";
export interface SocketMsgStruct{
    msgType?:MSG_TYPE
    msgHead:string,
    msgData?:any
}
export class NetManager extends SingleBase{
    showLoadTimes:number = 0
    socketMap:{[key:string]:SocketBase} = {}
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
    sendSocket(data:SocketMsgStruct,callBack?:(data:any)=>void,socketType:SocketType = SocketType.center){
        if(!this.socketMap[socketType]){
            game.logMgr.error("socketName:%s is not find",socketType);
            return;
        }
        this.socketMap[socketType].send(data,callBack);
    }
    createSocket(ip:string,socketType:SocketType = SocketType.center){
        if(this.socketMap[socketType]){
            return;
        }
        this.socketMap[socketType] = new SocketBase(socketType,ip);
    }
    onOpen(callBack:(any)=>void,target:CompBase,socketType:SocketType = SocketType.center){
        this.socketMap[socketType].onMsgHander("onOpen",callBack,target)
    }
    onReady(callBack:(any)=>void,target:CompBase,socketType:SocketType = SocketType.center){
        this.socketMap[socketType].onMsgHander("onReady",callBack,target)
    }
    onClose(callBack:(any)=>void,target:CompBase,socketType:SocketType = SocketType.center){
        this.socketMap[socketType].onMsgHander("onClose",callBack,target)
    }
    onMsg(msgName:string,callBack:(any)=>void,target?:CompBase,socketType:SocketType = SocketType.center){
        this.socketMap[socketType].onMsgHander(msgName,callBack,target)
    }
    showNetLoadingBar(_b){
        if(_b){
            this.showLoadTimes++
        }else{
            this.showLoadTimes--;
        }
    }
}