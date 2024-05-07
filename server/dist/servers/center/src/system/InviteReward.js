"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InviteReward = void 0;
const SystemBase_1 = require("../../../../common/base/SystemBase");
class InviteReward extends SystemBase_1.SystemBase {
    constructor() {
        super();
        this.selectRankInfo();
    }
    selectRankInfo() {
        // game.sqlMgr.select(e_TableName.USER)
    }
    updateRankScore(scoreData) {
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
exports.InviteReward = InviteReward;
