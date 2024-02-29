"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomPlayer = void 0;
class RoomPlayer {
    constructor(room, uid) {
        this.initResolveList = [];
        this.isInit = false;
        this.isOnLine = false;
        this.isEnterGame = false;
        this.clientReceiveFrameId = 0;
        this.playTypeMap = [];
        this.newFrameType = null;
        this.room = room;
        this.uid = uid;
        game.app.rpc(game.utilsMgr.getSid(this.uid, "info" /* serverType.info */)).info.main.getRoomPlayerInfo(this.uid).then((data) => {
            this.role = data.roleInfo;
            this.asset = data.assetInfo;
            this.isInit = true;
            this.callInitResolve();
        });
    }
    frameMsg(msg) {
        this.clientReceiveFrameId = msg.frameId;
        this.newFrameType = msg.frameType;
    }
    getFrames(frameId) {
        let frames = {};
        for (let i in this.playTypeMap) {
            let playFrameId = Number(i);
            if (playFrameId > frameId) {
                frames[playFrameId] = this.playTypeMap[i];
            }
        }
        return frames;
    }
    pushInFrameData() {
        if (this.newFrameType || this.newFrameType == 0) {
            this.playTypeMap[this.room.frameId] = this.newFrameType;
            this.newFrameType = null;
        }
    }
    callInitResolve() {
        if (this.isInit) {
            for (let i = this.initResolveList.length - 1; i >= 0; i--) {
                let resolve = this.initResolveList[i];
                resolve(this);
                this.initResolveList.splice(Number(i), 1);
            }
        }
    }
    getMyInfo() {
        return new Promise((resolve, reject) => {
            this.initResolveList.push(resolve);
            this.callInitResolve();
        });
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
