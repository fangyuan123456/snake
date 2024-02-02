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
const GameConfig_1 = require("./GameConfig");
class Room {
    constructor(uidList) {
        this.isGameStart = false;
        this.roomPlayers = {};
        for (let i in uidList) {
            let uid = uidList[i];
            this.roomPlayers[uid] = new RoomPlayer_1.RoomPlayer(this, uid);
        }
    }
    getRoomPlayer(uid) {
        return this.roomPlayers[uid];
    }
    getAllPlayerInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            let data = [];
            for (let i in this.roomPlayers) {
                let player = this.roomPlayers[i];
                let infoData = yield player.getMyInfo();
                data.push({
                    uid: infoData.uid,
                });
            }
            return data;
        });
    }
    boardMsg(msg) {
        for (let i in this.roomPlayers) {
            gameGame.sendMsg(this.roomPlayers[i].uid, msg);
        }
    }
    checkGameStart() {
        if (!this.isGameStart) {
            for (let i in this.roomPlayers) {
                if (!this.roomPlayers[i].isEnterGame) {
                    return false;
                }
            }
            setInterval(this.update.bind(this), GameConfig_1.GameConfig.frameDt);
        }
        return true;
    }
    enterRoom(msg, session, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield this.getAllPlayerInfo();
            let player = this.getRoomPlayer(session.uid);
            player.isEnterGame = true;
            this.checkGameStart();
            next({ roleInfo: data });
        });
    }
    frameMsg(msg, session, next) {
        if (this.isGameStart) {
            let player = this.getRoomPlayer(session.uid);
            if (player) {
                player.frameMsg(msg);
            }
        }
    }
    getFrameData(frameId) {
        let data = {};
        for (let i in this.roomPlayers) {
            let player = this.roomPlayers[i];
            data[player.uid] = player.getFrames(frameId);
        }
        return data;
    }
    sendFrame() {
        for (let i in this.roomPlayers) {
            let player = this.roomPlayers[i];
            let frameData = this.getFrameData(player.clientCurFrameId);
            gameGame.sendMsg(player.uid, { msgHead: "frameMsg", msgData: { frames: frameData, frameId: player.clientCurFrameId } });
        }
    }
    update() {
        for (let i in this.roomPlayers) {
            let player = this.roomPlayers[i];
            player.update();
        }
        this.sendFrame();
    }
}
exports.Room = Room;
