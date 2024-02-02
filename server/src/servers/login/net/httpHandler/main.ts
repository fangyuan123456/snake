import { Response } from "express";
import { I_loginReq, I_sdkLoginRes } from "../../../../common/interface/ILogin";
import { TableName } from "../../../../common/manager/SqlManager";
import { serverType } from "../../../../common/config/CommonCfg";
import { I_roleInfo } from "../../../../common/interface/IInfo";
import HandlerBase from "../../../../common/base/HandlerBase";
export default class Handler extends HandlerBase {
    constructor() {
        super();
    }
    updatePlayInviteData(uid:number,myInviteUid:number){
        game.app.rpc(game.utilsMgr.getSid(uid,serverType.info)).info.main.updatePlayInviteData(uid,myInviteUid);
    }
    onLoginHandler(msgData:I_loginReq,res:Response){
        game.platformMgr.getLoginCode(msgData,(sdkData:I_sdkLoginRes)=>{
            let inviteUid = msgData.inviteUid;
            delete msgData.isCeShi;
            delete msgData.code;
            delete msgData.inviteUid;
            game.utilsMgr.merge(msgData,sdkData);
            this.registerAndLogin(msgData).then((registerData:I_roleInfo)=>{
                let uid = registerData.uid;
                if(inviteUid){
                    this.updatePlayInviteData(inviteUid,uid);
                }
                let server = game.utilsMgr.getServerByUid(uid,serverType.center);
                let loginResData = game.utilsMgr.merge(registerData,{centerIp:"ws://"+game.utilsMgr.getServerIp(server),});
                game.httpServer!.sendMsg(loginResData,res);
            });
        });
    }
    registerAndLogin(data:any):Promise<I_roleInfo>{
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
            game.app.rpc(game.utilsMgr.getSid(mData.uid,serverType.info)).info.main.createPlayer(mData).then(()=>{
                resolve(mData);
            });
        })
    }
}