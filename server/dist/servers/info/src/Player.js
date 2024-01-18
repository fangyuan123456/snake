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
exports.Player = void 0;
const Asset_1 = require("./Asset");
const InfoConfig_1 = require("./InfoConfig");
class Player {
    constructor(role) {
        this.delThisTime = 0;
        this.isInit = false;
        this.queryResolveList = [];
        this.uid = role.uid;
        this.role = role;
        this.queryAllInfo();
    }
    queryAllInfo() {
        if (!this.isInit) {
            new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                this.asset = new Asset_1.Asset(this);
                yield this.asset.init();
                resolve(this);
            })).then(() => {
                this.isInit = true;
                for (let i in this.queryResolveList) {
                    this.queryResolveList[i](this);
                }
            });
        }
    }
    getPlayerInfo() {
        return new Promise((resolve, reject) => {
            if (this.isInit) {
                resolve(this);
            }
            else {
                this.queryResolveList.push(resolve);
            }
        });
    }
    setRoomInfo(roomInfo) {
        this.roomInfo = {
            roomId: roomInfo.roomId,
            roomIp: roomInfo.roomIp
        };
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
