"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfoServer = void 0;
const GameServerBase_1 = require("../../common/base/GameServerBase");
const Player_1 = require("./src/Player");
const InfoConfig_1 = require("./src/InfoConfig");
class InfoServer extends GameServerBase_1.GameServerBase {
    constructor(app) {
        super(app);
        this.roles = {}; // 所有玩家数据
        setInterval(this.update.bind(this), InfoConfig_1.InfoConfig.updateDt);
        setInterval(this.doSqlUpdate.bind(this), InfoConfig_1.InfoConfig.updateSqlDelayTime);
        setInterval(this.check_delRole.bind(this), 60 * 1000);
    }
    update() {
        for (let i in this.roles) {
            let player = this.roles[i];
            player.update();
        }
    }
    doSqlUpdate() {
        for (let i in this.roles) {
            let player = this.roles[i];
            player.doSqlUpdate();
        }
    }
    // 检测过期玩家，删除缓存数据
    check_delRole() {
        let nowTime = game.timeMgr.getCurTime();
        for (let i in this.roles) {
            let one = this.roles[i];
            if (one.delThisTime !== 0 && nowTime > one.delThisTime) {
                delete this.roles[i];
            }
        }
    }
    createPlayer(role) {
        let player = this.roles[role.uid];
        if (!player) {
            player = new Player_1.Player(role);
            this.roles[role.uid] = player;
        }
    }
}
exports.InfoServer = InfoServer;
