import { Response } from "express";
import { I_loginPlayerInfo, I_loginReq, I_loginRes, I_sdkLoginRes } from "../../../../common/interface/ILogin";
import { serverType } from "../../../../common/config/CommonCfg";
import { Dic } from "../../../../common/interface/ICommon";
import * as fs from "fs";
import * as path from "path";
import { e_InfoBundle } from "../../src/LoginConfig";
export default class Handler{
    constructor() {
    }
    updatePlayInviteData(uid:number,myInviteUid:number){
        game.infoMgr.changePlayerInfo(uid,{inviteUid:myInviteUid})
    }
    onLoginHandler(msgData:I_loginReq,res:Response){
        game.platformMgr.getLoginCode(msgData,(sdkData:I_sdkLoginRes)=>{
            let inviteUid = msgData.inviteUid;
            delete msgData.isCeShi;
            delete msgData.code;
            delete msgData.inviteUid;
            game.utilsMgr.merge(msgData,sdkData);
            this.registerAndLogin(msgData).then((registerData:I_loginPlayerInfo)=>{
                let uid = registerData.uid;
                if(inviteUid){
                    this.updatePlayInviteData(inviteUid,uid);
                }
                let server = game.utilsMgr.getServerByUid(uid,serverType.connector);
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
    registerAndLogin(loginData:any):Promise<I_loginPlayerInfo>{
        return new Promise(async (resolve,reject)=>{
            game.app.rpc(game.utilsMgr.getSid(0,serverType.info)).info.main.userRegister(loginData.openId).then((registerInfo:any)=>{
                game.app.rpc(game.utilsMgr.getSid(registerInfo.uid,serverType.info)).info.main.onUserIn(registerInfo.uid).then(async (playerInfo:any)=>{
                    game.infoMgr.setPlayerInfo(registerInfo.uid,{platform:loginData.platform,pathid:loginData.pathId});
                    let loginInfo = await game.infoMgr.getInfoByBundle<I_loginPlayerInfo>(registerInfo.uid,e_InfoBundle.getRoleInfo,playerInfo);
                    resolve(loginInfo)
                })
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