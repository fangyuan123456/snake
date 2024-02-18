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
const IGame_1 = require("../../../common/interface/IGame");
class Room {
    constructor(uidList, roomType) {
        this.isGameStart = false;
        this.roomPlayers = {};
        this.roomType = IGame_1.e_roomType.FIGHT;
        this.frameId = 0;
        this.roomType = roomType;
        for (let i in uidList) {
            let uid = uidList[i];
            this.roomPlayers[uid] = new RoomPlayer_1.RoomPlayer(this, uid);
        }
    }
    enterRoomHandler(msg, session, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield this.getAllPlayerInfo();
            let player = this.getRoomPlayer(session.uid);
            player.isEnterGame = true;
            this.checkGameStart();
            next({ playerInfos: data, gameTime: 0 });
        });
    }
    frameMsgHandler(msg, session, next) {
        if (this.isGameStart) {
            let player = this.getRoomPlayer(session.uid);
            if (player) {
                player.frameMsg(msg);
            }
        }
    }
    getRoomPlayer(uid) {
        return this.roomPlayers[uid];
    }
    getAllPlayerInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            let frameData = this.getFrameData();
            let getFrames = (uid) => {
                for (let i in frameData) {
                    if (frameData[i].uid == uid) {
                        return frameData[i].frames;
                    }
                }
            };
            let data = [];
            for (let i in this.roomPlayers) {
                let player = this.roomPlayers[i];
                let infoData = yield player.getMyInfo();
                data.push({
                    uid: infoData.uid,
                    nickName: infoData.role.nickName || "",
                    avatarUrl: infoData.role.avatarUrl || "",
                    rankScore: infoData.asset.rankScore,
                    frames: getFrames(infoData.uid)
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
    getFrameData(frameId = 0) {
        let data = [];
        for (let i in this.roomPlayers) {
            let player = this.roomPlayers[i];
            data.push({
                uid: player.uid,
                frames: player.getFrames(frameId)
            });
        }
        return data;
    }
    sendFrame() {
        for (let i in this.roomPlayers) {
            let player = this.roomPlayers[i];
            let frameData = this.getFrameData(player.clientCurFrameId);
            gameGame.sendMsg(player.uid, { msgHead: "frameMsg", msgData: { frameData: frameData } });
        }
    }
    update() {
        this.frameId++;
        for (let i in this.roomPlayers) {
            let player = this.roomPlayers[i];
            player.update();
        }
        this.sendFrame();
    }
}
exports.Room = Room;
