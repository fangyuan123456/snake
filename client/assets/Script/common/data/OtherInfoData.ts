import { CompBase } from "../base/CompBase";
import DataBase from "../base/DataBase";
import { Dic } from "../interface/I_Common";
import { I_roleInfo } from "../interface/I_Info";

export class OtherInfoData extends DataBase{
    otherPlayerInfo:Dic<I_roleInfo> = {}
    constructor(){
        super();
    }
    querPlayersInfo(uids:number[]){
        let newUids = [];
        for(let i in uids){
            if(!this.otherPlayerInfo[uids[i]]){
                newUids.push(uids[i]);
            }
        }
        game.netMgr.sendSocket({msgHead:"getPlayersInfo",msgData:{
            uids:newUids
        }},(datas:any)=>{
            this.otherPlayerInfo = game.utilsMgr.merge(this.otherPlayerInfo,datas.infos);
            this._callResolveFunc("otherPlayerInfo",this.otherPlayerInfo);
         })
    }
    getOtherPlayerInfo(uid:number,callBack:(data:any)=>void,target:CompBase){
        if(this.otherPlayerInfo[uid]){
            callBack(this.otherPlayerInfo[uid]);
        }else{
            this.infoResolveMap["otherPlayerInfo"] = this.infoResolveMap["otherPlayerInfo"] || [];
            this.infoResolveMap["otherPlayerInfo"].push({
                target:target,
                callBack:(allData)=>{
                    callBack(allData[uid])
                }
            })
        }
    }
}