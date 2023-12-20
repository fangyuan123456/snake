import { SingleBase } from "../base/SingleBase";
import { SocketType } from "../base/SocketBase";
export interface SendSocketStruct{
    msgHead:string,
    msgData:any
}
export class NetManager extends SingleBase{
    showLoadTimes:number = 0
    sendHttpRequest(data:any,className:string,_callBack:(data:any)=>void,_fileCallback:()=>void,retryTime:number,_isShowLoading){
        var that=this;
        if(_isShowLoading){
            this.showNetLoadingBar(true);
        }
         var dataStr=JSON.stringify(data);
         game.platFormMgr.sendHttpRequest(dataStr,(_dataStr)=>{
            if(_callBack){
                _callBack(JSON.parse(_dataStr));
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
    sendSocket(data:SendSocketStruct,socketType:SocketType = SocketType.Center){
    }
    showNetLoadingBar(_b){
        if(_b){
            this.showLoadTimes++
        }else{
            this.showLoadTimes--;
        }
    }
}