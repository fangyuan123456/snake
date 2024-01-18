"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Handler {
    constructor() {
    }
    enterRoom(msg, session, next) {
        session.set({ "roomId": msg.roomId });
        this.route("enterRoom", msg, session, next);
    }
    route(msgName, msg, session, next) {
        let roomId = session.get("roomId");
        let room = gameGame.getRoom(roomId);
        //@ts-ignore
        let func = room[msgName];
        if (func) {
            func(msg, session, next);
        }
        else {
            game.logMgr.error("msgName:%s is not found in Room", msgName);
        }
    }
}
exports.default = Handler;
