"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
const IInfo_1 = require("../../../common/interface/IInfo");
const Asset_1 = require("./Asset");
const InfoConfig_1 = require("./InfoConfig");
const Role_1 = require("./Role");
const InviteReward_1 = require("./InviteReward");
class Player {
    constructor(uid, data) {
        this.delThisTime = 0;
        this.roomInfo = { roomId: 0, roomIp: "" };
        this.isInit = false;
        this.uid = uid;
        this.init(data);
    }
    init(data) {
        for (let i in IInfo_1.e_InfoType) {
            if (i == IInfo_1.e_InfoType.asset) {
                this.asset = new Asset_1.Asset(this, data === null || data === void 0 ? void 0 : data.asset);
            }
            else if (i == IInfo_1.e_InfoType.role) {
                this.role = new Role_1.Role(this, data === null || data === void 0 ? void 0 : data.role);
            }
            else if (i == IInfo_1.e_InfoType.inviteReward) {
                this.inviteReward = new InviteReward_1.InviteReward(this, data === null || data === void 0 ? void 0 : data.inviteReward);
            }
        }
    }
    getInfo(infoType) {
        if (infoType == IInfo_1.e_InfoType.asset) {
            return this.asset.getInfo();
        }
        else if (infoType == IInfo_1.e_InfoType.inviteReward) {
            return this.inviteReward.getInfo();
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
    onLine() {
        this.delThisTime = 0;
    }
    offline() {
        this.delThisTime = game.timeMgr.getCurTime() + InfoConfig_1.InfoConfig.offLineInfoCleanTime;
    }
    doSqlUpdate() {
        var _a;
        for (let i in IInfo_1.e_InfoType) {
            //@ts-ignore
            (_a = this[IInfo_1.e_InfoType[i]]) === null || _a === void 0 ? void 0 : _a.doSqlUpdate();
        }
    }
    update() {
        var _a, _b;
        for (let i in IInfo_1.e_InfoType) {
            //@ts-ignore
            if (this[IInfo_1.e_InfoType[i]] && ((_a = this[IInfo_1.e_InfoType[i]]) === null || _a === void 0 ? void 0 : _a.updateDt)) {
                //@ts-ignore
                (_b = this[IInfo_1.e_InfoType[i]]) === null || _b === void 0 ? void 0 : _b.updateDt();
            }
        }
    }
    getRoomInfoHandler(msg, session, next) {
        next(this.roomInfo);
    }
    getRoleInfoHandler(msg, session, next) {
        this.getInfo(IInfo_1.e_InfoType.role).then((data) => {
            next(data);
        });
    }
    getAssetInfoHandler(msg, session, next) {
        this.getInfo(IInfo_1.e_InfoType.asset).then((data) => {
            next(data);
        });
    }
    getInviteRewardInfoHandler(msg, session, next) {
        this.getInfo(IInfo_1.e_InfoType.inviteReward).then((data) => {
            next(data);
        });
    }
}
exports.Player = Player;
