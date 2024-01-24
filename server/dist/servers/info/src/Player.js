"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
const IInfo_1 = require("../../../common/interface/IInfo");
const Asset_1 = require("./Asset");
const InfoConfig_1 = require("./InfoConfig");
const Role_1 = require("./Role");
class Player {
    constructor(role) {
        this.delThisTime = 0;
        this.roomInfo = { roomId: 0, roomIp: "" };
        this.isInit = false;
        this.uid = role.uid;
        this.init(role);
    }
    init(role) {
        for (let i in IInfo_1.e_InfoType) {
            if (i == IInfo_1.e_InfoType.asset) {
                this.asset = new Asset_1.Asset(this);
            }
            else if (i == IInfo_1.e_InfoType.role) {
                this.role = new Role_1.Role(this, role);
            }
        }
    }
    getInfo(infoType) {
        if (infoType == IInfo_1.e_InfoType.asset) {
            return this.asset.getInfo();
        }
        else {
            return this.role.getInfo();
        }
    }
    setRoomInfo(roomInfo) {
        this.roomInfo = {
            roomId: roomInfo.roomId,
            roomIp: roomInfo.roomIp
        };
    }
    updateInviteData(inviteUid) {
        this.role.updateInviteData(inviteUid);
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
    getRoomInfo(msg, session, next) {
        next(this.roomInfo);
    }
    getRoleInfo(msg, session, next) {
        this.getInfo(IInfo_1.e_InfoType.role).then((data) => {
            next(data);
        });
    }
    getAssetInfo(msg, session, next) {
        this.getInfo(IInfo_1.e_InfoType.asset).then((data) => {
            next(data);
        });
    }
}
exports.Player = Player;
