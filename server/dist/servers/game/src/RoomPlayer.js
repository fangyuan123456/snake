"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomPlayer = void 0;
class RoomPlayer {
    constructor(uid) {
        this.initResolveList = [];
        this.isInit = false;
        this.uid = uid;
        game.app.rpc(game.utilsMgr.getSid(this.uid, "info" /* serverType.info */)).info.main.getRoomPlayerInfo(this.uid).then((data) => {
            this.role = data.role;
            this.isInit = true;
            this.callInitResolve();
        });
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
}
exports.RoomPlayer = RoomPlayer;
