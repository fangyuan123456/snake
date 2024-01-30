import { I_loginReq } from "../../common/interface/I_Login";
import { PlatformBase } from "../PlatformBase";

export class WebPlatfromManager extends PlatformBase{
    platformName = "web"
    getLoginCode(callBack:(data:I_loginReq)=>void){
        let inviteUid = this.getWebParm("inviteUid")
        var _data={
            isCeShi:true,
            platform:this.platformName,
            code:this.getWebParm("code"),
            inviteUid:inviteUid?Number(inviteUid):null
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