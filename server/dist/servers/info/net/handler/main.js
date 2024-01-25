"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Handler {
    constructor() {
    }
    route(msgName, msg, session, next) {
        let player = infoGame.getPlayer(session.uid);
        if (!player) {
            player = infoGame.createPlayer(session.uid);
        }
        //@ts-ignore
        let func = player[msgName];
        if (func) {
            func.call(player, msg, session, next);
        }
        else {
            game.logMgr.error("msgName:%s is not found in Room", msgName);
        }
    }
}
exports.default = Handler;
