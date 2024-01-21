"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameServer = void 0;
const GameServerBase_1 = require("../../common/base/GameServerBase");
const Room_1 = require("./src/Room");
class GameServer extends GameServerBase_1.GameServerBase {
    constructor(app) {
        super(app);
        this.rooms = {};
        globalThis.gameGame = this;
    }
    createRoom(msg) {
        if (this.rooms[msg.roomId]) {
            return false;
        }
        this.rooms[msg.roomId] = new Room_1.Room(msg.uidList);
    }
    getRoom(roomId) {
        return this.rooms[roomId];
    }
    getRoomPlayer(roomId, uid) {
        let room = this.getRoom(roomId);
        if (room) {
            return room.getRoomPlayer(uid);
        }
    }
}
exports.GameServer = GameServer;
