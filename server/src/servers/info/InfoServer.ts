import { Application, Session } from "mydog";
import { GameServerBase } from "../../common/base/GameServerBase";
import { Dic, I_playerAllInfo } from "../../common/interface/ICommon";
import { SqlManager, e_TableName } from "./SqlManager";
import { DataConfig } from "./InfoConfig";
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
    userLoginOut(uid:number){
       this.offLinePlayer[uid] = DataConfig.offLineCleanTime;
    }
    async getPlayerInfo(uid:number,infoKey?:Dic<any>){
        return new Promise<Dic<any>>(async (resolve, reject) => {
            if(this.playerInfo[uid]){
                resolve(this.playerInfo[uid]);
            }else{
                if(infoKey){
                    let info = await this.sqlMgr.getPlayerInfo(uid,infoKey);
                    resolve(info)
                }else{
                    this.playerInfo[uid] = await this.sqlMgr.getPlayerInfo(uid);
                    this.offLinePlayer[uid] = DataConfig.unLoginCleanTime;
                    resolve(this.playerInfo[uid]);
                }
            }
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
    }
    update(){
        for(let uid in this.offLinePlayer){
            this.offLinePlayer[uid]--;
            if(this.offLinePlayer[uid]<0){
                delete this.playerInfo[uid];
                delete this.offLinePlayer[uid];
            }
        }
    }
    cleanInfo(){

    }
}