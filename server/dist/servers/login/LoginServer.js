"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginServer = void 0;
const ConnectSvrOnLineNumComp_1 = require("../../common/components/ConnectSvrOnLineNumComp");
const GameServerBase_1 = require("../../common/base/GameServerBase");
class LoginServer extends GameServerBase_1.GameServerBase {
    constructor(app) {
        super(app);
        this.svrNumComp = new ConnectSvrOnLineNumComp_1.ConnectSvrOnLineNumComp("centor" /* serverType.centor */);
    }
    getMinSvrId() {
        return this.svrNumComp.minSvr.id;
    }
}
exports.LoginServer = LoginServer;
