import { SqlBase } from "../../../common/base/SqlBase";
import { Dic } from "../../../common/interface/ICommon";
import {I_item, I_roleInfo } from "../../../common/interface/IInfo";
import { TableName } from "../../../common/manager/SqlManager";
import {Player } from "./Player";
export class Role extends SqlBase{
    data: I_roleInfo;
    private player:Player
    constructor(player: Player,role:I_roleInfo) {
        super(TableName.USER,{uid:player.uid})
        this.data = role;
        this.player = player;
    }
    getInfo(){
        return new Promise((resolve,reject)=>{
            resolve(this.data);
        })
    }
    init():Promise<Dic<any>>{
        return new Promise(async (resolve:(data:Dic<any>)=>void,reject)=>{
            resolve(this.data);
        })
    }
    updateInviteData(inviteUid:number){
        let role = this.data;
        if(role){
            role.inviteUids = role.inviteUids || "";
            if(role.inviteUids == ""){
                role.inviteUids+=inviteUid;
            }else{
                role.inviteUids+="#"+inviteUid;
            }
        }
        this.update({inviteUids:role.inviteUids})

        let session = game.app.getSession(this.player.uid);
        session.send(game.protoMgr.getProtoCode("getRoleInfo")!,this.data)
    }
}