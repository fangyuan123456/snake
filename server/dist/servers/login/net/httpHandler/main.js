"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const path = __importStar(require("path"));
const LoginConfig_1 = require("../../src/LoginConfig");
class Handler {
    constructor() {
    }
    updatePlayInviteData(uid, myInviteUid) {
        game.infoMgr.changePlayerInfo(uid, { inviteUid: myInviteUid });
    }
    onLoginHandler(msgData, res) {
        game.platformMgr.getLoginCode(msgData, (sdkData) => {
            let inviteUid = msgData.inviteUid;
            delete msgData.isCeShi;
            delete msgData.code;
            delete msgData.inviteUid;
            game.utilsMgr.merge(msgData, sdkData);
            this.registerAndLogin(msgData).then((registerData) => {
                let uid = registerData.uid;
                if (inviteUid) {
                    this.updatePlayInviteData(inviteUid, uid);
                }
                let server = game.utilsMgr.getServerByUid(uid, "connector" /* serverType.connector */);
                let loginResData = {
                    centerIp: game.utilsMgr.getServerIp(server),
                    isOpenShare: game.platformMgr.getPlatformApi(msgData.platform).getIsOpenShare(),
                    isSheHeState: game.platformMgr.getPlatformApi(msgData.platform).getIsSheHeState(),
                    playerInfo: registerData,
                };
                game.httpServer.sendMsg(loginResData, res);
            });
        });
    }
    registerAndLogin(loginData) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            game.app.rpc(game.utilsMgr.getSid(0, "info" /* serverType.info */)).info.main.userRegister(loginData.openId).then((registerInfo) => {
                game.app.rpc(game.utilsMgr.getSid(registerInfo.uid, "info" /* serverType.info */)).info.main.onUserIn(registerInfo.uid).then((playerInfo) => __awaiter(this, void 0, void 0, function* () {
                    game.infoMgr.setPlayerInfo(registerInfo.uid, { platform: loginData.platform, pathid: loginData.pathId });
                    let loginInfo = yield game.infoMgr.getInfoByBundle(registerInfo.uid, LoginConfig_1.e_InfoBundle.getRoleInfo, playerInfo);
                    resolve(loginInfo);
                }));
            });
        }));
    }
    onGetJumpGameListReq(msgData, res) {
        game.httpServer.sendMsg(game.platformMgr.getPlatformApi(msgData.platform), res);
    }
    onGetTableCfgHandler(versionData, res) {
        let pathUrl = path.join(loginGame.app.base, "common/config/tables/version");
        let jsonData = require(pathUrl);
        let dataMap = {};
        if (game.utilsMgr.comporeVersion(versionData.version, jsonData.version)) {
            for (let i in jsonData.versionMap) {
                if (versionData.versionMap[i] != jsonData.versionMap[i]) {
                    let dataPathUrl = path.join(loginGame.app.base, "common/config/tables/clientCfg/" + i);
                    dataMap[i] = require(dataPathUrl);
                }
            }
            if (Object.keys(dataMap).length > 0) {
                dataMap["version"] = jsonData;
            }
            game.httpServer.sendMsg(dataMap, res);
        }
        else {
            game.httpServer.sendMsg(dataMap, res);
        }
    }
}
exports.default = Handler;
