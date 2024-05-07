"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Handler {
    enterRoom(msg, session, next) {
        this.route("enterRoom", msg, session, next);
    }
    route(msgName, msg, session, next) {
        let roomId = session.get("roomId");
        let room = gameGame.getRoom(roomId);
        if (room) {
            //@ts-ignore
            let func = room[msgName + "Handler"];
            if (func) {
                func.call(room, msg, session, next);
            }
            else {
                game.logMgr.error("msgName:%s is not found in Room", msgName);
            }
        }
    }
}
exports.default = Handler;
