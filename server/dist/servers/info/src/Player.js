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
// import { Bag, I_item } from "./bag";
// import { Equipment } from "./equipment";
// import { j2x2 } from "../svr_map/map";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
const InfoConfig_1 = require("./InfoConfig");
class Player {
    constructor(uid, callBack) {
        this.delThisTime = 0;
        this.uid = uid;
        this.queryAllInfo(callBack);
    }
    queryAllInfo(callBack) {
        setTimeout(() => {
            if (callBack) {
                callBack();
            }
        }, 500);
    }
    online() {
        this.delThisTime = 0;
    }
    offline() {
        this.delThisTime = game.timeMgr.getCurTime() + InfoConfig_1.InfoConfig.offLineInfoCleanTime;
    }
    doSqlUpdate() {
        var _a, _b;
        (_a = this.bag) === null || _a === void 0 ? void 0 : _a.doSqlUpdate();
        (_b = this.equip) === null || _b === void 0 ? void 0 : _b.doSqlUpdate();
    }
    update() {
        var _a, _b;
        (_a = this.bag) === null || _a === void 0 ? void 0 : _a.update();
        (_b = this.equip) === null || _b === void 0 ? void 0 : _b.update();
    }
}
exports.Player = Player;
