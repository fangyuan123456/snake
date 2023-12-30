import { Application } from "mydog";
import { GameServerBase } from "../../common/base/GameServerBase";
import { Dic } from "../../common/interface/ICommon";
import { Player } from "./src/Player";
import { InfoConfig } from "./src/InfoConfig";

export class InfoServer extends GameServerBase{
    private roles: Dic<Player> = {};    // 所有玩家数据
    constructor(app:Application){
        super(app);
        setInterval(this.update.bind(this),InfoConfig.updateDt)
        setInterval(this.doSqlUpdate.bind(this),InfoConfig.updateSqlDelayTime)
    }
    update(){
        for(let i in this.roles){
            let player = this.roles[i];
            player.update();
        }
    }
    doSqlUpdate(){
        for(let i in this.roles){
            let player = this.roles[i];
            player.doSqlUpdate();
        }
    }
}