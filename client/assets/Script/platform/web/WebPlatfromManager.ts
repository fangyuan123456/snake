import { PlatformBase } from "../PlatformBase";

export class WebPlatfromManager extends PlatformBase{
    platformName = "web"
    loadOrderCfg = [
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
            funcName:"changeScene",
            progressNum:10,
            time:0.5,
            title:"场景准备中..."
        }
    ]
    getLoginCode(callBack:(data:any)=>void){
        var _data={
            isCeShi:true,
            platform:this.platformName,
            code:this.getWebParm("code")
        };
        callBack(_data)
    }
    getWebParm(key){
        let getWebParmFunc = (name)=> {
            let r = null;
            if(window && window.location){
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                r = window.location.search.substr(1).match(reg);
            }
            if (r != null) return unescape(r[2]); return null;
        };
        return getWebParmFunc(key)
    }
}