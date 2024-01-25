import { SqlBase } from "../../../common/base/SqlBase";
import { Dic } from "../../../common/interface/ICommon";
import {I_item, I_roleInfo } from "../../../common/interface/IInfo";
import { TableName } from "../../../common/manager/SqlManager";
import {Player } from "./Player";
export class Role extends SqlBase{
    data?: I_roleInfo;
    private player:Player
    constructor(player: Player,role?:I_roleInfo) {
        super(TableName.USER,{uid:player.uid})
        this.data = role;
        this.player = player;
    }
    updateInviteData(inviteUid:number){
        let role = this.data!;
        if(role){
            role.inviteUids = role.inviteUids || "";
            if(role.inviteUids == ""){
                role.inviteUids+=inviteUid;
            }else{
                role.inviteUids+="#"+inviteUid;
            }
        }
        this.update({inviteUids:role.inviteUids})

        game.sendMsg(this.player.uid,{msgHead:"getRoleInfo",msgData:this.data});
    }
}