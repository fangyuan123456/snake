import { SqlUpdateBase } from "../../../common/base/SqlUpdateBase";
import { I_bagItem, I_item } from "../../../common/interface/IInfo";
import {Player } from "./Player";

export class Bag extends SqlUpdateBase{
    private items: I_bagItem[];
    private player:Player
    public whileUpdateSqlKeyMap:{[key:string]:number[]} = {};
    constructor(player: Player, items: I_bagItem[]) {
        super("t_bag")
        this.player = player;
        this.items = items;
    }
    change(msg: { "t": I_item, num: number,isDel:boolean }){
        
    }
    updateSql(){
        super.doUpdateSql({uid:this.player.uid});
    }
    update(){
        
    }
}