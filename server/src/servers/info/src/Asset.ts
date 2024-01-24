import { SqlBase } from "../../../common/base/SqlBase";
import { Dic } from "../../../common/interface/ICommon";
import {I_asset, I_item } from "../../../common/interface/IInfo";
import { TableName } from "../../../common/manager/SqlManager";
import {Player } from "./Player";
let defaultItems:Dic<I_item> = {
    1:{
        num: 2
    },
    2:{
        num:2
    }
}
export class Asset extends SqlBase{
    data?: I_asset;
    private player:Player
    public whileUpdateSqlKeyMap:{[key:string]:number[]} = {};
    constructor(player: Player) {
        super(TableName.ASSET,{uid:player.uid})
        this.player = player;
    }
    init():Promise<Dic<any>>{
        return new Promise(async (resolve,reject)=>{
            super.init(defaultItems).then((data:Dic<any>)=>{
                resolve(data);
            })
        })
    }
    update(){
        
    }
}