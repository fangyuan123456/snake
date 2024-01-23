import { ServerCfg } from "../common/configs/ServerCfg";
import { SingleBase } from "../common/base/SingleBase";
import { I_loginReq } from "../common/interface/Ilogin";
export interface LOAD_ORDER_CFG{
    funcName:string,
    progressNum:number,
    time:number,
    title:string
}
export enum PLATFORM_TYPE{
    WEB,
    TT,
    WX,
    ANDROID,
    IOS
}
export function getPlatForm():PLATFORM_TYPE{
    if(cc.sys.platform == cc.sys.DESKTOP_BROWSER || cc.sys.platform == cc.sys.MOBILE_BROWSER){
        return PLATFORM_TYPE.WEB
    }else if(window["tt"]){
        return PLATFORM_TYPE.TT
    }else if(window["wx"]){
        return PLATFORM_TYPE.WX
    }else if(cc.sys.platform  == cc.sys.ANDROID){
        return PLATFORM_TYPE.ANDROID
    }else if(cc.sys.platform  == cc.sys.IPHONE){
        return PLATFORM_TYPE.IOS
    }
}
export abstract class PlatformBase extends SingleBase{
    platformName = ""
    loadOrderCfg:LOAD_ORDER_CFG[];
    getLoadPercentCfg(){
        return this.loadOrderCfg;
    }
    sendHttpRequest(data:any,callBack:(callDataStr:any)=>void,failCallBack:()=>void){
        var xhr = new XMLHttpRequest();
        xhr.open("POST",data.url);
        xhr.setRequestHeader("Content-Type","text/plain;charset=UTF-8");
        xhr.responseType="json";
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4){
                if(xhr.status >= 200 && xhr.status <= 207) {
                    if(callBack){
                        callBack(xhr.response);
                    }
                }else{
                    failCallBack();
                }
            }
        };
        xhr.ontimeout = function(){
            failCallBack();
        }
        xhr.onerror = function(){
            failCallBack();
        }
        let sendData = {
            msgHead:data.msgHead,
            msgData:data.msgData
        }
        xhr.send(JSON.stringify(sendData));
    }
    createSocket(ip:string,binaryType:BinaryType="arraybuffer"){
        var socketTarget = new WebSocket(ip);
        socketTarget.binaryType=binaryType;
        return socketTarget
    }
    getLoginCode(callBack:(data:I_loginReq)=>void){
        
    }
};