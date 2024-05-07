import { Application, Session, connector } from "mydog";
import { GameServerBase } from "../../common/base/GameServerBase";
import { Rank } from "./src/system/Rank";
import { InviteReward } from "./src/system/InviteReward";
import { bundleInfoKeyCfg } from "./src/CenterConfig";
import { Dic } from "../../common/interface/ICommon";
import { I_rankItemInfo } from "../../common/interface/ICenter";
declare global{
    namespace globalThis{
        var centerGame:CenterServer
    }
}

export class CenterServer extends GameServerBase{
    rank:Rank;
    inviteReward:InviteReward
    rankDataList:Dic<I_rankItemInfo[]> = {}//榜上玩家
    constructor(app:Application){
        super(app);
        globalThis.centerGame = this;
        this.rank = new Rank();
        this.inviteReward = new InviteReward();
    }
    setConfig(): void {
        super.setConfig(bundleInfoKeyCfg,true);
    }
    setRankInfo(rankInfo:Dic<I_rankItemInfo[]>){
        this.rankDataList = rankInfo;
    }
    async updateRankInfo(uid:number,info:Dic<number>){
        let getRankItem = (scoreKey:string,checkUid:number)=>{
            let itemList = this.rankDataList[scoreKey];
            for(let i in itemList){
                if(itemList[i].uid == checkUid){
                    return itemList[i];
                }
            }
        }
        for(let i in info){
            let itemList = this.rankDataList[i];
            if(info[i]>itemList[itemList.length-1].score){
                let item = getRankItem(i,uid);
                if(item){
                    item.score = info[i];
                }else{
                    let info =  await this.infoMgr.getPlayerInfo(uid);
                    itemList.push({
                        uid:uid,
                        nickName:info.nickName,
                        avatarUrl:info.avatarUrl,
                        score:info[i]
                    })
                }
                itemList.sort((a,b)=>{
                    return a.score - b.score
                })
                if(!item){
                    itemList.pop();
                }
            }
        }
    }
}