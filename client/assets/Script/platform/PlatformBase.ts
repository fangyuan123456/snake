import { ServerCfg } from "../common/configs/ServerCfg";
import { SingleBase } from "../common/base/SingleBase";
import { I_loginReq } from "../common/interface/I_Login";
import { I_LoadCfg } from "../common/interface/I_Common";
export interface I_webSocket{
    send:(buffer:ArrayBuffer)=>void,
    close:()=>void,
    onopen:()=>void,
    onmessage:(buffer:ArrayBuffer)=>void,
    onerror:()=>void,
    onclose:()=>void
}
export interface I_updSocket{
    send:(buffer:ArrayBuffer)=>void,
    close:()=>void,
    onmessage:(buffer:ArrayBuffer)=>void,
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
    isSupportUdp = false
    isSheHeState:boolean = false
    isOpenShare:boolean = false
    loadOrderCfg:I_LoadCfg[]=[
        {
            funcName:"loadRes",
            progressNum:20,
            time:0.3,
            title:"加载资源中..."
        },
        {
            funcName:"login",
            progressNum:100,
            time:1,
            title:"登录中..."
        },
        {
            funcName:"loadCfg",
            progressNum:100,
            time:1,
            title:"加载配置信息..."
        },
        {
            funcName:"changeScene",
            progressNum:10,
            time:0.5,
            title:"场景准备中..."
        }
    ];
    getLoadPercentCfg(){
        return this.loadOrderCfg;
    }
    sendHttpRequest(data:any,callBack:(callDataStr:any)=>void,failCallBack:()=>void){
        let xhr = new XMLHttpRequest();
        xhr.open("POST",data.url);
        xhr.setRequestHeader("Content-Type","text/plain;charset=UTF-8");
        xhr.responseType="json";
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4){
                if(xhr.status >= 200 && xhr.status <= 207) {
                    if(callBack){
                        callBack(xhr.response);
                    }
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
    createWebSocket(ip:string):I_webSocket{
        let webSocket = new WebSocket(ip);
        webSocket.binaryType="arraybuffer";
        let socketTarget:I_webSocket = {
            send:(buffer)=>{
                webSocket.send(buffer);
            },
            close:()=>{
                webSocket.close();
            },
            onopen:()=>{},
            onmessage:()=>{},
            onerror:()=>{},
            onclose:()=>{}
        }
        webSocket.onopen = ()=>{
            socketTarget.onopen();
        };
        webSocket.onmessage = (event)=>{
            socketTarget.onmessage(event.data);
        };
        webSocket.onclose = ()=>{
            socketTarget.onclose();
        };
        webSocket.onerror = ()=>{
            socketTarget.onerror();
        };
        return socketTarget;
    }
    createUdpSocket(ip:string):I_updSocket{
        let socketTarget:I_updSocket = {
            send:null,
            close:null,
            onmessage:null,
        }
        return socketTarget;
    }
    share(text:string){
        
    }
    getLoginCode(callBack:(data:I_loginReq)=>void){
        
    }
    getIsOpenShare() {
        return this.isOpenShare;
    }
    getIsSheHeState() {
        return this.isSheHeState;
    }
    postMsg(key:string,data:any){

    }
};