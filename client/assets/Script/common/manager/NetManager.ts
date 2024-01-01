import { SingleBase } from "../base/SingleBase";
import { SocketBase } from "../base/SocketBase";
import { ServerCfg } from "../configs/ServerCfg";
export interface SocketMsgStruct{
    msgHead:string,
    msgData:any
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
    sendSocket(socketName:string,data:SocketMsgStruct,callBack?:()=>void){
        if(!this.socketMap[socketName]){
            game.logMgr.error("socketName:%s is not find",socketName);
            return;
        }
        this.socketMap[socketName].send(data,callBack);
    }
    createSocket(socketName:string,ip:string,createFunc?:(socketName:string,ip:string)=>SocketBase){
        if(!this.socketMap[socketName]){
            return;
        }
        if(createFunc){
            this.socketMap[socketName] = createFunc(socketName,ip);
        }else{
            this.socketMap[socketName] = new SocketBase(socketName,ip);
        }
    }
    showNetLoadingBar(_b){
        if(_b){
            this.showLoadTimes++
        }else{
            this.showLoadTimes--;
        }
    }
}