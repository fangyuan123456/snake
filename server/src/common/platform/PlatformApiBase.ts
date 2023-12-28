import { I_loginReq, I_sdkLoginRes } from "../interface/ILogin";

export class PlatformApiBase{
    constructor(){

    }
    getLoginCode(data:I_loginReq,callBack:(resData:I_sdkLoginRes)=>void){
        if(callBack){
            callBack({
                openid : data.code
            });
        }
    }
}