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
exports.InfoManager = void 0;
const SingleBase_1 = require("../base/SingleBase");
class InfoManager extends SingleBase_1.SingleBase {
    constructor() {
        super();
        this.playerInfo = {};
    }
    onNotifyPlayerInfoUpdate(uid, info) {
        let changeInfo = {};
        for (let infoKey in info) {
            let data = info[infoKey];
            if (this.playerInfo[uid]) {
                if (this.playerInfo[uid][infoKey] != data) {
                    this.playerInfo[uid][infoKey] = data;
                    changeInfo[infoKey] = data;
                }
            }
            else {
                changeInfo[infoKey] = data;
            }
        }
        let infos = this.spliceInfoByBundle(changeInfo);
        for (let bundleName in infos) {
            game.eventMgr.dispatch("playerInfoUpdate", { uid: uid, bundleName: bundleName, info: infos[bundleName] });
        }
    }
    onNotifyCleanPlayerInfo(uid) {
        delete this.playerInfo[uid];
    }
    spliceInfoByBundle(info) {
        let bundleInfos = {};
        for (let bundleName in game.bundleInfoKeyCfg) {
            for (let index in game.bundleInfoKeyCfg[bundleName]) {
                let infoKey = game.bundleInfoKeyCfg[bundleName][index];
                if (info[infoKey]) {
                    bundleInfos[bundleName] = bundleInfos[bundleName] || {};
                    bundleInfos[bundleName][infoKey] = info[infoKey];
                }
            }
        }
        return bundleInfos;
    }
    getInfoServer(uid) {
        if (game.app.serverType == "info" /* serverType.info */) {
            return infoGame;
        }
        else {
            return game.app.rpc(game.utilsMgr.getSid(uid, "info" /* serverType.info */)).info.main;
        }
    }
    getPlayerInfo(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            if (game.app.serverType == "info" /* serverType.info */) {
                return infoGame.getPlayerInfo(uid);
            }
            else {
                let info = this.playerInfo[uid];
                if (!info) {
                    info = yield this.getInfoServer(uid).getPlayerInfo(uid, game.getAllBundleInfoKey());
                    if (game.getIsNeedCacheInfo()) {
                        this.playerInfo[uid] = info;
                    }
                }
                return info;
            }
        });
    }
    getOnceInfo(uid, infoKeyList) {
        return __awaiter(this, void 0, void 0, function* () {
            let playerInfo = yield this.getInfoServer(uid).getOnceInfo(uid, infoKeyList);
            return playerInfo;
        });
    }
    setPlayerInfo(uid, info) {
        if (game.app.serverType == "info" /* serverType.info */) {
            infoGame.setPlayerInfo(uid, info);
        }
        else {
            if (this.playerInfo[uid]) {
                for (let infoKey in info) {
                    let data = info[infoKey];
                    this.playerInfo[uid][infoKey] = data;
                }
            }
            this.getInfoServer(uid).setPlayerInfo(uid, info);
        }
    }
    changePlayerInfo(uid, info) {
        return __awaiter(this, void 0, void 0, function* () {
            let orginInfo = yield this.getOnceInfo(uid, Object.keys(info));
            let resetInfo = {};
            for (let i in info) {
                if (typeof orginInfo[i] == "number" && typeof info[i] == "number") {
                    orginInfo[i] = orginInfo[i] += info[i];
                }
                else if (orginInfo[i] instanceof Array) {
                    let infoArr = info[i];
                    if (!(info[i] instanceof Array)) {
                        infoArr = [info[i]];
                    }
                    for (let index in infoArr) {
                        let infoData = infoArr[index];
                        if (orginInfo[i].indexOf(infoData) < 0) {
                            orginInfo[i].push(infoData);
                        }
                    }
                }
                else if (orginInfo[i] instanceof Object) {
                    let orginData = orginInfo[i];
                    for (let key in info[i]) {
                        orginData[key] += info[i][key];
                    }
                }
                resetInfo[i] = orginInfo[i];
            }
            this.getInfoServer(uid).setPlayerInfo(uid, resetInfo);
        });
    }
    getInfoByBundle(uid, bundleName, info) {
        return __awaiter(this, void 0, void 0, function* () {
            info = info || (yield this.getPlayerInfo(uid));
            let bundleInfoKeyCfg = game.bundleInfoKeyCfg;
            let cfgArr = bundleInfoKeyCfg[bundleName];
            if (!cfgArr) {
                game.logMgr.error("infoBundleName:%s is not cfg", bundleName);
                return {};
            }
            else {
                let bundleInfo = {};
                for (let i in cfgArr) {
                    bundleInfo[cfgArr[i]] = info[cfgArr[i]];
                }
                return bundleInfo;
            }
        });
    }
}
exports.InfoManager = InfoManager;
