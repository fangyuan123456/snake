import { Application } from "mydog";
import { GameServerBase } from "../../common/base/GameServerBase";
import { Dic } from "../../common/interface/ICommon";
import { Player } from "./src/Player";
import { InfoConfig } from "./src/InfoConfig";
import { I_roleInfo } from "../../common/interface/IInfo";
declare global{
    namespace globalThis{
        var infoGame:InfoServer
    }
}
export class InfoServer extends GameServerBase{
    private players: Dic<Player> = {};    // 所有玩家数据
    constructor(app:Application){
        super(app);
        globalThis.infoGame = this;
        setInterval(this.update.bind(this),InfoConfig.updateDt)
        setInterval(this.doSqlUpdate.bind(this),InfoConfig.updateSqlDelayTime)
        setInterval(this.check_delRole.bind(this), 60 * 1000);
    }
    update(){
        for(let i in this.players){
            let player = this.players[i];
            player.update();
        }
    }
    private doSqlUpdate(){
        for(let i in this.players){
            let player = this.players[i];
            player.doSqlUpdate();
        }
    }
    // 检测过期玩家，删除缓存数据
    private check_delRole() {
        let nowTime = game.timeMgr.getCurTime();
        for (let i in this.players) {
            let one = this.players[i];
            if (one.delThisTime !== 0 && nowTime > one.delThisTime) {
                delete this.players[i];
            }
        }
    }
    createPlayer(uid:number,role?:I_roleInfo){
        let player = this.players[uid];
        if(!player){
            player = new Player(uid,{role:role});
            this.players[uid] = player;
        }
        return player
    }
    getPlayer(uid:number){
        return this.players[uid];
    }
    updatePlayInviteData(uid:number,inviteUid:number){
        let player = this.players[uid];
        if(player){
            player.updateInviteData(inviteUid);
        }
    }
}