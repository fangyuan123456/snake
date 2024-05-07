"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Remote {
    constructor() {
    }
    notifyCleanInfo(uid) {
        game.infoMgr.onNotifyCleanPlayerInfo(uid);
    }
    notifySetInfo(uid, info) {
        game.infoMgr.onNotifyPlayerInfoUpdate(uid, info);
    }
    createRoom(msg) {
        gameGame.createRoom(msg);
    }
}
exports.default = Remote;
