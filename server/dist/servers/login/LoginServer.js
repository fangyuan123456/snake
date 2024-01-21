"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginServer = void 0;
const GameServerBase_1 = require("../../common/base/GameServerBase");
class LoginServer extends GameServerBase_1.GameServerBase {
    constructor(app) {
        super(app);
        globalThis.loginGame = this;
    }
    getDefaultUserData(uid) {
        return {
            uid: uid,
            nickName: "uid_" + uid,
            avatarUrl: ""
        };
    }
}
exports.LoginServer = LoginServer;
