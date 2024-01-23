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
    private roles: Dic<Player> = {};    // 所有玩家数据
    constructor(app:Application){
        super(app);
        globalThis.infoGame = this;
        setInterval(this.update.bind(this),InfoConfig.updateDt)
        setInterval(this.doSqlUpdate.bind(this),InfoConfig.updateSqlDelayTime)
        setInterval(this.check_delRole.bind(this), 60 * 1000);
    }
    update(){
        for(let i in this.roles){
            let player = this.roles[i];
            player.update();
        }
    }
    private doSqlUpdate(){
        for(let i in this.roles){
            let player = this.roles[i];
            player.doSqlUpdate();
        }
    }
    // 检测过期玩家，删除缓存数据
    private check_delRole() {
        let nowTime = game.timeMgr.getCurTime();
        for (let i in this.roles) {
            let one = this.roles[i];
            if (one.delThisTime !== 0 && nowTime > one.delThisTime) {
                delete this.roles[i];
            }
        }
    }
    createPlayer(role:I_roleInfo){
        let player = this.roles[role.uid];
        if(!player){
            player = new Player(role);
            this.roles[role.uid] = player;
        }
    }
    getPlayer(uid:number){
        return this.roles[uid];
    }
    updatePlayInviteData(uid:number,inviteUid:number){
        let player = this.roles[uid];
        if(player){
            player.updateInviteData(inviteUid);
        }
    }
}