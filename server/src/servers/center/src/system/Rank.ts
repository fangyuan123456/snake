import { SystemBase } from "../../../../common/base/SystemBase";
import { I_rankItemInfo } from "../../../../common/interface/ICenter";
import { Dic } from "../../../../common/interface/ICommon";

export class Rank extends SystemBase{
    rankLen:number = 100;
    rankDataList:Dic<I_rankItemInfo[]> = {}//榜上玩家
    constructor(){
        super();
        this.selectRankInfo();
    }

    selectRankInfo(){
        // game.sqlMgr.select(e_TableName.USER)
    }
    updateRankScore(scoreData:Dic<{score:number,type:string}>){
        // for(let i in scoreData){
        //     this.outRankData[scoreData[i].type][i].score = scoreData[i].score;
        //     this.rankDataList[scoreData[i].type].push(this.outRankData[scoreData[i].type][i]);
        // }
        // for(let type in this.rankDataList){
        //     let rankList = this.rankDataList[type];
        //     for(let i = this.rankLen;i<rankList.length;i++){
        //         for(let j = this.rankLen - 1;j>=0;j--){
        //             if(rankList[i].score>rankList[j].score){
        //                 let rank
        //                 break;
        //             }
        //         }
        //     }
        // }
    //    for(let i = 100;i<this.rankDataList[])


    }
}