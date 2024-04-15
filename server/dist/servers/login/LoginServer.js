"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginServer = void 0;
const GameServerBase_1 = require("../../common/base/GameServerBase");
const LoginConfig_1 = require("./src/LoginConfig");
class LoginServer extends GameServerBase_1.GameServerBase {
    constructor(app) {
        super(app);
        globalThis.loginGame = this;
    }
    setConfig() {
        super.setConfig(LoginConfig_1.bundleInfoKeyCfg);
    }
}
exports.LoginServer = LoginServer;
