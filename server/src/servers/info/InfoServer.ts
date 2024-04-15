import { Application, Session } from "mydog";
import { GameServerBase } from "../../common/base/GameServerBase";
import { Dic, I_playerAllInfo } from "../../common/interface/ICommon";

import { serverType } from "../../common/config/CommonCfg";
import { SqlManager, e_TableName } from "./src/SqlManager";
import { DataConfig, bundleInfoKeyCfg } from "./src/InfoConfig";
declare global{
    namespace globalThis{
        var infoGame:InfoServer
    }
}
export class InfoServer extends GameServerBase{
    playerInfo:Dic<Dic<any>> = {};
    offLinePlayer:Dic<number> = {};
    sqlMgr:SqlManager;
    constructor(app:Application){
        super(app);
        this.sqlMgr = SqlManager.getInstance();
        globalThis.infoGame = this;
        setInterval(this.update.bind(this),1000);
    }
    async userLoginIn(uid:number){
        let info =  await this.getPlayerInfo(uid);
        delete this.offLinePlayer[uid];
        return info;
    }
    async userRegister(openId:number){
        return await this.sqlMgr.selectTb(e_TableName.USER,{openId:openId});
    }
    userLoginOut(uid:number){
       this.offLinePlayer[uid] = DataConfig.offLineCleanTime;
    }
    async getPlayerInfo(uid:number,infoKeyList?:string[]){
        return new Promise<Dic<any>>(async (resolve, reject) => {
            let newInfo:Dic<any> = {};
            let info:Dic<any> = {};
            if(this.playerInfo[uid]){
                info = this.playerInfo[uid]
            }else{
                this.playerInfo[uid] = await this.sqlMgr.getPlayerInfo(uid);
                this.offLinePlayer[uid] = DataConfig.unLoginCleanTime;
                info = this.playerInfo[uid]
            }
            if(infoKeyList){
                for(let i in infoKeyList){
                    let key = infoKeyList[i];
                    newInfo[key] = info[key];
                }
                resolve(newInfo);
            }else{
                resolve(info);
            }
      })
    }
    async getOnceInfo(uid:number,infoKeyList:string[]){
        return new Promise<Dic<any>>(async (resolve, reject) => {
            let newInfo:Dic<any> = {};
            let info:Dic<any> = {};
            if(this.playerInfo[uid]){
                info = this.playerInfo[uid]
            }else{
                info = await this.sqlMgr.getPlayerInfo(uid,infoKeyList);
            }
            for(let i in infoKeyList){
                let key = infoKeyList[i];
                newInfo[key] = info[key];
            }
            resolve(newInfo);
      })
    }
    setPlayerInfo(uid:number,info:Dic<any>){
        if(this.playerInfo[uid]){
            for(let infoKey in info){
                let data = info[infoKey];
                this.playerInfo[uid][infoKey] = data;
            }
        }
        this.sqlMgr.setPlayerInfo(uid,info);
        this.notifySetInfo(uid,info);
    }
    update(){
        for(let uid in this.offLinePlayer){
            this.offLinePlayer[uid]--;
            if(this.offLinePlayer[uid]<0){
                delete this.playerInfo[uid];
                delete this.offLinePlayer[uid];
                this.notifyCleanInfo(Number(uid));
            }
        }
    }
    notifyCleanInfo(uid:number){
        game.app.rpc(game.utilsMgr.getSid(uid,serverType.center)).center.main.notifyCleanInfo(uid);
        game.app.rpc(game.utilsMgr.getSid(uid,serverType.game)).game.main.notifyCleanInfo(uid);
    }
    notifySetInfo(uid:number,info:Dic<any>){
        game.app.rpc(game.utilsMgr.getSid(uid,serverType.center)).center.main.notifySetInfo(uid,info);
        game.app.rpc(game.utilsMgr.getSid(uid,serverType.game)).game.main.notifySetInfo(uid,info);

        //通知客户端消息变更
        let infos = game.infoMgr.spliceInfoByBundle(info)
        for(let i in infos){
            game.sendMsg(uid,{msgHead:i,msgData:infos})
        }
    }

    setConfig(){
        super.setConfig(bundleInfoKeyCfg)
    }
}