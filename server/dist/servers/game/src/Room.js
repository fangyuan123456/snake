"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Room = void 0;
const RoomPlayer_1 = require("./RoomPlayer");
class Room {
    constructor(uidList) {
        this.roomPlayers = {};
        for (let i in uidList) {
            let uid = uidList[i];
            this.roomPlayers[uid] = new RoomPlayer_1.RoomPlayer(uid);
        }
    }
    getRoomPlayer(uid) {
        return this.roomPlayers[uid];
    }
    enterRoom(msg, session, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = [];
            for (let i in this.roomPlayers) {
                let player = this.roomPlayers[i];
                let infoData = yield player.getMyInfo();
                data.push({
                    uid: infoData.uid,
                });
            }
            next({ roleInfo: data });
        });
    }
}
exports.Room = Room;
