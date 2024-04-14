import { Response } from "express";
import { I_loginReq, I_loginRes, I_sdkLoginRes } from "../../../../common/interface/ILogin";
import { e_TableName } from "../../../info/SqlManager";
import { serverType } from "../../../../common/config/CommonCfg";
import { I_roleInfo } from "../../../../common/interface/IInfo";
import HandlerBase from "../../../../common/base/HandlerBase";
import { Dic } from "../../../../common/interface/ICommon";
import * as fs from "fs";
import * as path from "path";
export default class Handler extends HandlerBase {
    constructor() {
        super();
    }
    updatePlayInviteData(uid:number,myInviteUid:number){
        game.infoMgr.getInfo(uid,["inviteUid"]).then((data)=>{
            let inviteUid  = data.inviteUid;
            inviteUid.push(myInviteUid);
            game.infoMgr.setInfo(uid,{inviteUid:inviteUid})
        })
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
                let loginResData:I_loginRes = {
                    centerIp:game.utilsMgr.getServerIp(server),
                    isOpenShare:game.platformMgr.getPlatformApi(msgData.platform).getIsOpenShare(),
                    isSheHeState:game.platformMgr.getPlatformApi(msgData.platform).getIsSheHeState(),
                    playerInfo:registerData,

                }
                game.httpServer!.sendMsg(loginResData,res);
            });
        });
    }
    registerAndLogin(data:any):Promise<I_roleInfo>{
        return new Promise(async (resolve,reject)=>{
            let mData:I_roleInfo;
            let userData = await game.sqlMgr.select(e_TableName.USER,{openId:data.openId})
            if(userData.length == 0){
                userData = await game.sqlMgr.add(e_TableName.USER,data);
                mData = loginGame.getDefaultUserData(userData.insertId);
                game.utilsMgr.merge(mData,data);
                game.sqlMgr.update(e_TableName.USER,mData,{uid:mData.uid});
            }else{
                mData = userData[0];
            }
            game.app.rpc(game.utilsMgr.getSid(mData.uid,serverType.info)).info.main.userLoginIn(mData.uid).then((info)=>{
                resolve(info);
            })
        })
    }
    onGetJumpGameListReq(msgData:{platform:string},res:Response){
        game.httpServer!.sendMsg(game.platformMgr.getPlatformApi(msgData.platform),res);
    }
    onGetTableCfgHandler(versionData:{version:string,versionMap:Dic<string>} ,res:Response){
        let pathUrl = path.join(loginGame.app.base,"common/config/tables/version")
        let jsonData:{version:string,versionMap:Dic<string>} = require(pathUrl)
        let dataMap:Dic<string> = {}
        if(game.utilsMgr.comporeVersion(versionData.version,jsonData.version)){
            for(let i in jsonData.versionMap){
                if(versionData.versionMap[i]!=jsonData.versionMap[i]){
                    let dataPathUrl = path.join(loginGame.app.base, "common/config/tables/clientCfg/" + i);
                    dataMap[i] = require(dataPathUrl);
                }
            }
            if(Object.keys(dataMap).length>0){
                dataMap["version"] = (jsonData as any);
            }
            game.httpServer!.sendMsg(dataMap,res)
        }else{
            game.httpServer!.sendMsg(dataMap,res)
        }
    
    }
}