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
exports.InfoServer = void 0;
const GameServerBase_1 = require("../../common/base/GameServerBase");
const SqlManager_1 = require("./src/SqlManager");
const InfoConfig_1 = require("./src/InfoConfig");
class InfoServer extends GameServerBase_1.GameServerBase {
    constructor(app) {
        super(app);
        this.playerInfo = {};
        this.offLinePlayer = {};
        this.sqlMgr = SqlManager_1.SqlManager.getInstance();
        globalThis.infoGame = this;
        setInterval(this.update.bind(this), 1000);
    }
    userLoginIn(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            let info = yield this.getPlayerInfo(uid);
            delete this.offLinePlayer[uid];
            return info;
        });
    }
    userRegister(openId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.sqlMgr.selectTb(SqlManager_1.e_TableName.USER, { openId: openId });
        });
    }
    userLoginOut(uid) {
        this.offLinePlayer[uid] = InfoConfig_1.DataConfig.offLineCleanTime;
    }
    getPlayerInfo(uid, infoKeyList) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let newInfo = {};
                let info = {};
                if (this.playerInfo[uid]) {
                    info = this.playerInfo[uid];
                }
                else {
                    this.playerInfo[uid] = yield this.sqlMgr.getPlayerInfo(uid);
                    this.offLinePlayer[uid] = InfoConfig_1.DataConfig.unLoginCleanTime;
                    info = this.playerInfo[uid];
                }
                if (infoKeyList) {
                    for (let i in infoKeyList) {
                        let key = infoKeyList[i];
                        newInfo[key] = info[key];
                    }
                    resolve(newInfo);
                }
                else {
                    resolve(info);
                }
            }));
        });
    }
    getOnceInfo(uid, infoKeyList) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let newInfo = {};
                let info = {};
                if (this.playerInfo[uid]) {
                    info = this.playerInfo[uid];
                }
                else {
                    info = yield this.sqlMgr.getPlayerInfo(uid, infoKeyList);
                }
                for (let i in infoKeyList) {
                    let key = infoKeyList[i];
                    newInfo[key] = info[key];
                }
                resolve(newInfo);
            }));
        });
    }
    setPlayerInfo(uid, info) {
        if (this.playerInfo[uid]) {
            for (let infoKey in info) {
                let data = info[infoKey];
                this.playerInfo[uid][infoKey] = data;
            }
        }
        this.sqlMgr.setPlayerInfo(uid, info);
        this.notifySetInfo(uid, info);
    }
    update() {
        for (let uid in this.offLinePlayer) {
            this.offLinePlayer[uid]--;
            if (this.offLinePlayer[uid] < 0) {
                delete this.playerInfo[uid];
                delete this.offLinePlayer[uid];
                this.notifyCleanInfo(Number(uid));
            }
        }
    }
    notifyCleanInfo(uid) {
        game.app.rpc(game.utilsMgr.getSid(uid, "center" /* serverType.center */)).center.main.notifyCleanInfo(uid);
        game.app.rpc(game.utilsMgr.getSid(uid, "game" /* serverType.game */)).game.main.notifyCleanInfo(uid);
    }
    notifySetInfo(uid, info) {
        game.app.rpc(game.utilsMgr.getSid(uid, "center" /* serverType.center */)).center.main.notifySetInfo(uid, info);
        game.app.rpc(game.utilsMgr.getSid(uid, "game" /* serverType.game */)).game.main.notifySetInfo(uid, info);
        //通知客户端消息变更
        let infos = game.infoMgr.spliceInfoByBundle(info);
        for (let i in infos) {
            game.sendMsg(uid, { msgHead: i, msgData: infos });
        }
    }
    setConfig() {
        super.setConfig(InfoConfig_1.bundleInfoKeyCfg);
    }
}
exports.InfoServer = InfoServer;
