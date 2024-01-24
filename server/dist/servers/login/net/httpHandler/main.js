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
const SqlManager_1 = require("../../../../common/manager/SqlManager");
class Handler {
    constructor() {
    }
    updatePlayInviteData(uid, myInviteUid) {
        game.app.rpc(game.utilsMgr.getSid(uid, "info" /* serverType.info */)).info.main.updatePlayInviteData(uid, myInviteUid);
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
                let server = game.utilsMgr.getServerByUid(uid, "center" /* serverType.center */);
                let loginResData = game.utilsMgr.merge(registerData, { centerIp: "ws://" + game.utilsMgr.getServerIp(server), });
                game.httpMgr.sendMsg(loginResData, res);
            });
        });
    }
    registerAndLogin(data) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            let mData;
            let userData = yield game.sqlMgr.select(SqlManager_1.TableName.USER, { openId: data.openId });
            if (userData.length == 0) {
                userData = yield game.sqlMgr.add(SqlManager_1.TableName.USER, data);
                mData = loginGame.getDefaultUserData(userData.insertId);
                game.utilsMgr.merge(mData, data);
                game.sqlMgr.update(SqlManager_1.TableName.USER, mData, { uid: mData.uid });
            }
            else {
                mData = userData[0];
            }
            game.app.rpc(game.utilsMgr.getSid(mData.uid, "info" /* serverType.info */)).info.main.createPlayer(mData).then(() => {
                resolve(mData);
            });
        }));
    }
}
exports.default = Handler;
