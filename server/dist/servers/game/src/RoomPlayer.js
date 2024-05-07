"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomPlayer = void 0;
class RoomPlayer {
    constructor(room, uid) {
        this.isOnLine = false;
        this.isEnterGame = false;
        this.clientReceiveFrameId = 0;
        this.userInputList = [];
        this.newUserInput = 0;
        this.room = room;
        this.uid = uid;
        game.infoMgr.getPlayerInfo(uid);
    }
    frameMsg(msg) {
        this.clientReceiveFrameId = msg.frameId;
        this.newUserInput = msg.frameType;
    }
    getFrames(frameId) {
        return this.userInputList.slice(frameId - 1);
    }
    pushInFrameData() {
        this.userInputList.push(this.newUserInput);
    }
    onLine() {
        this.isOnLine = true;
    }
    offLine() {
        this.isOnLine = false;
    }
    update() {
        this.pushInFrameData();
    }
}
exports.RoomPlayer = RoomPlayer;
