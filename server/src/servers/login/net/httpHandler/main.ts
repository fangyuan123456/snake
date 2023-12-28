import { Response } from "express";
import { I_loginReq, I_loginRes, I_sdkLoginRes } from "../../../../common/interface/ILogin";
export default class Handler {
    constructor() {
    }
    onLoginHandler(msgData:I_loginReq,res:Response){
        game.httpMgr!.sendMsg({
            url:game.svrNumComp?.getMinSvrIp()
        },res);
        game.platformMgr.getLoginCode(msgData,(data:I_sdkLoginRes)=>{
            this.registerAndLogin(data,(data)=>{
                res.end(data);
            });
        });
    }
    registerAndLogin(data:I_sdkLoginRes,callBack:(data:I_loginRes)=>void){
            
    }
}