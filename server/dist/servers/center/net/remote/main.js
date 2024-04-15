"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Remote {
    notifyCleanInfo(uid) {
        game.infoMgr.onNotifyCleanPlayerInfo(uid);
    }
    notifySetInfo(uid, info) {
        game.infoMgr.onNotifyPlayerInfoUpdate(uid, info);
    }
}
exports.default = Remote;
