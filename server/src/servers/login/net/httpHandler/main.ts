import { Response } from "express";
import { I_loginReq, I_loginRes, I_sdkLoginRes } from "../../../../common/interface/ILogin";
import { TableName } from "../../../../common/manager/SqlManager";
export default class Handler {
    constructor() {
    }
    onLoginHandler(msgData:I_loginReq,res:Response){
        game.platformMgr.getLoginCode(msgData,(data:I_sdkLoginRes)=>{
            this.registerAndLogin(data).then((registerData:any)=>{
                let loginResData:I_loginRes = {
                    centerIp:game.svrNumComp!.getMinSvrIp(),
                    uid:registerData.uid,
                    nickName:registerData.nickName
                }
                game.httpMgr!.sendMsg(loginResData,res);
            });
        });
    }
    async registerAndLogin(data:I_sdkLoginRes){
        let userData = await game.sqlMgr.select(TableName.USER,data)
        if(userData.length == 0){
            userData = await game.sqlMgr.add(TableName.USER,data);
        }
        let mData = userData[userData.length-1];
        game.app.rpc(game.utilsMgr.getInfoId(mData.uid)).info.main.createPlayer(mData);
        return mData
    }
}