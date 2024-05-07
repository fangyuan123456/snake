import { Application, Session } from "mydog";
import { GameServerBase } from "../../common/base/GameServerBase";
import { Dic, I_playerAllInfo } from "../../common/interface/ICommon";
import { SqlManager, e_TableName } from "./SqlManager";
import { DataConfig } from "./InfoConfig";
import { serverType } from "../../common/config/CommonCfg";
import { I_rankItemInfo } from "../../common/interface/ICenter";
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
        this.setRankInfo();
    }
    async setRankInfo(){
        let rankInfo:Dic<I_rankItemInfo[]> = {}; 
        let getInfoItemByUid = (scoreKey:string,uid:number)=>{
            for(let i in rankInfo[scoreKey]){
                if(rankInfo[scoreKey][i].uid == uid){
                    return rankInfo[scoreKey][i];
                }
            }
        }
        let rankKeyList = ["score,rankScore"];
        for(let i in rankKeyList){
            let rankKey = rankKeyList[i];
            let sqlStr = "select uid,"+rankKey+" from "+e_TableName.SCORE+" order by "+rankKey+" desc limit 50 ";
            let sqlData = await this.sqlMgr.sqlClient.query(sqlStr,null)
            if(sqlData&&sqlData.length>0){
                var uidStr="";
                rankInfo[rankKey] = rankInfo[rankKey] || [];
                for(var index=0;index<sqlData.length;index++){
                    rankInfo[rankKey].push({
                        uid:sqlData[index].uid,
                        nickName:"",
                        avatarUrl:"",
                        score:sqlData[index].score
                    })
                    if(index==sqlData.length-1){
                        uidStr+=(sqlData[i].uid+"");
                    }else{
                        uidStr+=(sqlData[i].uid+",");
                    }
                }


                let getInfoSqlStr="select nickName,avatarUrl,uid from "+e_TableName.USER+" where uid in ("+uidStr+")";
                let infoSqlData = await  this.sqlMgr.sqlClient.query(getInfoSqlStr,null)

                if(infoSqlData.length){
                    for(let m=0;m<infoSqlData.length;m++){
                        let item = getInfoItemByUid(i,infoSqlData[m].uid)!
                        item.nickName = infoSqlData[m].nickName;
                        item.avatarUrl = infoSqlData[m].avatarUrl;
                    }
                }
            }
        }

        let centerServerCfg = this.app.serversConfig["center"]
        for(let i in centerServerCfg){
            this.app.rpc(centerServerCfg[i].id).center.main.setRankInfo(rankInfo);
        }
    }
    updateRankInfo(uid:number,info:Dic<any>){
        if(info["score"] || info["rankScore"]){
            let updateInfo:Dic<number> = {};
            if(info["score"]){
                updateInfo["score"] = info["score"]
            }
            if(info["rankScore"]){
                updateInfo["rankScore"] = info["rankScore"]
            }
            let centerServerCfg = this.app.serversConfig["center"]
            for(let i in centerServerCfg){
                this.app.rpc(centerServerCfg[i].id).center.main.updateRankInfo(uid,updateInfo);
            }
        }
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
        this.updateRankInfo(uid,info);
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