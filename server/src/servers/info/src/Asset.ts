import { SqlBase } from "../../../common/base/SqlBase";
import { Dic } from "../../../common/interface/ICommon";
import {I_asset, I_item } from "../../../common/interface/IInfo";
import { TableName } from "../../../common/manager/SqlManager";
import {Player } from "./Player";
export class Asset extends SqlBase{
    data?: I_asset;
    defaultItems?:Dic<any> = {
        items:{
            1:{
                num: 2
            },
            2:{
                num:2
            }
        }
    }
    private player:Player
    public whileUpdateSqlKeyMap:{[key:string]:number[]} = {};
    constructor(player: Player,asset?:I_asset) {
        super(TableName.ASSET,{uid:player.uid})
        this.data = asset;
        this.player = player;
    }
    update(){
        
    }
}