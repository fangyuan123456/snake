"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HandlerBase_1 = __importDefault(require("../../../../common/base/HandlerBase"));
class Handler extends HandlerBase_1.default {
    constructor() {
        super();
    }
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
