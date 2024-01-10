"use strict";
// import { gameLog } from "../common/logger";
// import { friendState, I_friendInfo_client, I_roleAllInfo, I_roleAllInfoClient, I_roleMem, I_uidsid } from "../common/someInterface";
// import { svr_info } from "./svr_info";
// import { constKey } from "../common/someConfig";
// import { app } from "mydog";
// import { nowMs } from "../common/time";
// import { cmd } from "../../config/cmd";
// import { getBit, getDiffDays, randArrElement, setBit, timeFormat } from "../util/util";
// import { MapIdMgr } from "../svr_map/mapIdMgr";
// import { I_playerMapJson } from "../../servers/map/handler/main";
// import { cfg_all, I_cfg_mapDoor } from "../common/configUtil";
// import { Asset, I_item } from "./asset";
// import { Equipment } from "./equipment";
// import { j2x2 } from "../svr_map/map";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
const InfoConfig_1 = require("./InfoConfig");
class Player {
    constructor(uid) {
        this.delThisTime = 0;
        this.isInit = false;
        this.queryResolveList = [];
        this.uid = uid;
        this.queryAllInfo();
    }
    queryAllInfo() {
        if (!this.isInit) {
            new Promise((resolve, reject) => {
                resolve({});
            }).then(() => {
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
    online() {
        this.delThisTime = 0;
    }
    offline() {
        this.delThisTime = game.timeMgr.getCurTime() + InfoConfig_1.InfoConfig.offLineInfoCleanTime;
    }
    doSqlUpdate() {
        var _a, _b;
        (_a = this.asset) === null || _a === void 0 ? void 0 : _a.doSqlUpdate();
        (_b = this.equip) === null || _b === void 0 ? void 0 : _b.doSqlUpdate();
    }
    update() {
        var _a, _b;
        (_a = this.asset) === null || _a === void 0 ? void 0 : _a.update();
        (_b = this.equip) === null || _b === void 0 ? void 0 : _b.update();
    }
}
exports.Player = Player;
