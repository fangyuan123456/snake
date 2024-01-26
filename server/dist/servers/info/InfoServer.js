"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfoServer = void 0;
const GameServerBase_1 = require("../../common/base/GameServerBase");
const Player_1 = require("./src/Player");
const InfoConfig_1 = require("./src/InfoConfig");
class InfoServer extends GameServerBase_1.GameServerBase {
    constructor(app) {
        super(app);
        this.players = {}; // 所有玩家数据
        globalThis.infoGame = this;
        setInterval(this.update.bind(this), InfoConfig_1.InfoConfig.updateDt);
        setInterval(this.doSqlUpdate.bind(this), InfoConfig_1.InfoConfig.updateSqlDelayTime);
        setInterval(this.check_delRole.bind(this), 60 * 1000);
    }
    update() {
        for (let i in this.players) {
            let player = this.players[i];
            player.update();
        }
    }
    doSqlUpdate() {
        for (let i in this.players) {
            let player = this.players[i];
            player.doSqlUpdate();
        }
    }
    // 检测过期玩家，删除缓存数据
    check_delRole() {
        let nowTime = game.timeMgr.getCurTime();
        for (let i in this.players) {
            let one = this.players[i];
            if (one.delThisTime !== 0 && nowTime > one.delThisTime) {
                delete this.players[i];
            }
        }
    }
    createPlayer(uid, role) {
        let player = this.players[uid];
        if (!player) {
            player = new Player_1.Player(uid, { role: role });
            this.players[uid] = player;
        }
        return player;
    }
    getPlayer(uid) {
        return this.players[uid];
    }
    onUserIn(session) {
        let uid = session.uid;
        let player = infoGame.getPlayer(uid);
        if (!player) {
            player = infoGame.createPlayer(uid);
        }
        player.onLine();
    }
    onUserLeave(session) {
        let uid = session.uid;
        let player = infoGame.getPlayer(uid);
        if (player) {
            player.offline();
        }
    }
}
exports.InfoServer = InfoServer;
