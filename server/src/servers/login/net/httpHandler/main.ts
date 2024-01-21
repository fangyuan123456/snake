import { Response } from "express";
import { I_loginReq, I_sdkLoginRes } from "../../../../common/interface/ILogin";
import { TableName } from "../../../../common/manager/SqlManager";
import { serverType } from "../../../../common/config/GameCfg";
import { I_roleInfo } from "../../../../common/interface/IInfo";
export default class Handler {
    constructor() {
    }
    onLoginHandler(msgData:any,res:Response){
        game.platformMgr.getLoginCode(msgData,(sdkData:I_sdkLoginRes)=>{
            delete msgData.isCeShi;
            delete msgData.code;
            game.utilsMgr.merge(msgData,sdkData);
            this.registerAndLogin(msgData).then((registerData:any)=>{
                let uid = registerData.uid;
                let server = game.utilsMgr.getServerByUid(uid,serverType.center);
                let loginResData = {
                    centerIp:"ws://"+game.utilsMgr.getServerIp(server),
                    uid:uid,
                    nickName:registerData.nickName,
                    avatarUrl:registerData.avatarUrl
                }
                game.httpMgr!.sendMsg(loginResData,res);
            });
        });
    }
    registerAndLogin(data:any){
        return new Promise(async (resolve,reject)=>{
            let mData:I_roleInfo;
            let userData = await game.sqlMgr.select(TableName.USER,{openId:data.openId})
            if(userData.length == 0){
                userData = await game.sqlMgr.add(TableName.USER,data);
                mData = loginGame.getDefaultUserData(userData.insertId);
                game.utilsMgr.merge(mData,data);
                game.sqlMgr.update(TableName.USER,mData,{uid:mData.uid});
            }else{
                mData = userData[0];
            }
            game.app.rpc(game.utilsMgr.getSid(mData.uid,serverType.info)).info.main.createPlayer(mData);
            resolve(mData);
        })
    }
}