"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Handler {
    constructor() {
    }
    getRoomInfo(msg, session, next) {
        let player = infoGame.getPlayer(session.uid);
        if (player) {
            let roomInfo = player.roomInfo;
            if (roomInfo) {
                next({ roomId: roomInfo.roomId, roomIp: roomInfo.roomIp });
                return;
            }
        }
        next({ roomId: 0, roomIp: "" });
    }
}
exports.default = Handler;
