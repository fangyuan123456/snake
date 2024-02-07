"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomPlayer = void 0;
class RoomPlayer {
    constructor(room, uid) {
        this.initResolveList = [];
        this.isInit = false;
        this.isOnLine = false;
        this.isEnterGame = false;
        this.clientCurFrameId = 0;
        this.framesTypeList = [];
        this.newFrameType = 0;
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
        this.clientCurFrameId = msg.frameId;
        this.newFrameType = msg.frameType;
    }
    getFrames(frameId) {
        let newFrameTypeList = [];
        for (let i = frameId; i < this.framesTypeList.length; i++) {
            newFrameTypeList.push(this.framesTypeList[i]);
        }
        return newFrameTypeList;
    }
    pushInFrameData() {
        this.framesTypeList.push(this.newFrameType);
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
