"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomPlayer = void 0;
class RoomPlayer {
    constructor(uid) {
        this.initResolveList = [];
        this.isInit = false;
        this.uid = uid;
        let callInitResolve = () => {
            for (let i in this.initResolveList) {
                let resolve = this.initResolveList[i];
                resolve(this);
            }
        };
        game.app.rpc(game.utilsMgr.getSid(this.uid, "info" /* serverType.info */)).info.main.getRoomPlayerInfo(this.uid).then((data) => {
            this.role = data.role;
            this.isInit = true;
            callInitResolve();
        });
    }
    getMyInfo() {
        return new Promise((resolve, reject) => {
            if (this.isInit) {
                resolve(this);
            }
        });
    }
}
exports.RoomPlayer = RoomPlayer;
