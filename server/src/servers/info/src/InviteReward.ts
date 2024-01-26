import { SqlBase } from "../../../common/base/SqlBase";
import { Dic } from "../../../common/interface/ICommon";
import {I_asset, I_inviteReward, I_item } from "../../../common/interface/IInfo";
import { TableName } from "../../../common/manager/SqlManager";
import {Player } from "./Player";
export class InviteReward extends SqlBase{
    data?: I_inviteReward;
    defaultItems?:Dic<any> = {
        inviteUids:[],
        getRewardIndexs:[]
    }
    private player:Player
    public whileUpdateSqlKeyMap:{[key:string]:number[]} = {};
    constructor(player: Player,inviteReward?:I_inviteReward) {
        super(TableName.INVITE_REWARD,{uid:player.uid})
        this.data = inviteReward;
        this.player = player;
    }
    updateInviteData(inviteUid:number){
        let data = this.data!;
        if(data){
            data.inviteUids = data.inviteUids || [];
            if(data.inviteUids.indexOf(inviteUid)>=0){
                return;
            }
            data.inviteUids.push(inviteUid)
        }
        this.update({inviteUids:data.inviteUids})
        game.sendMsg(this.player.uid,{msgHead:"getInviteRewardInfo",msgData:this.data});
    }
    getInviteReward(){

    }
}