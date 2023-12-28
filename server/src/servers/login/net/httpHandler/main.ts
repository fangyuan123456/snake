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
            this.registerAndLogin(data).then(()=>{
                res.end(data);
            });
        });
    }
    async registerAndLogin(data:I_sdkLoginRes){
        let userData = await game.sqlMgr.select("t_user",data)
        if(userData.length == 0){
            userData = await game.sqlMgr.add("t_user",data);
        }
        return userData;
    }
}