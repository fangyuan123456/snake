import { SqlUpdateBase } from "../../../common/base/SqlUpdateBase";
import { I_equipment, I_item } from "../../../common/interface/IInfo";
import {Player } from "./Player";

export class Quip extends SqlUpdateBase{
    public equip:I_equipment;
    private player:Player
    constructor(player:Player,equip: I_equipment) {
        super("t_quip");
        this.equip = equip;
        this.player = player;
    }
    doSqlUpdate(){
        super.doSqlUpdate({uid:this.player.uid});
    }
    update(){

    }
}