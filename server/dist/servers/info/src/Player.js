"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
const IInfo_1 = require("../../../common/interface/IInfo");
const Asset_1 = require("./Asset");
const InfoConfig_1 = require("./InfoConfig");
class Player {
    constructor(role) {
        this.delThisTime = 0;
        this.isInit = false;
        this.uid = role.uid;
        this.role = role;
        this.init();
    }
    init() {
        for (let i in IInfo_1.e_InfoType) {
            if (i == IInfo_1.e_InfoType.asset) {
                this.asset = new Asset_1.Asset(this);
            }
        }
    }
    getInfo(infoType) {
        if (infoType == IInfo_1.e_InfoType.asset) {
            return this.asset.getInfo();
        }
        else {
            return new Promise((resolve, reject) => {
                resolve(this.role);
            });
        }
    }
    setRoomInfo(roomInfo) {
        this.roomInfo = {
            roomId: roomInfo.roomId,
            roomIp: roomInfo.roomIp
        };
    }
    getRoomInfo() {
        return this.roomInfo;
    }
    online() {
        this.delThisTime = 0;
    }
    offline() {
        this.delThisTime = game.timeMgr.getCurTime() + InfoConfig_1.InfoConfig.offLineInfoCleanTime;
    }
    doSqlUpdate() {
        var _a;
        (_a = this.asset) === null || _a === void 0 ? void 0 : _a.doSqlUpdate();
    }
    update() {
        var _a;
        (_a = this.asset) === null || _a === void 0 ? void 0 : _a.update();
    }
}
exports.Player = Player;
