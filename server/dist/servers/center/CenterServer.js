"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CenterServer = void 0;
const mydog_1 = require("mydog");
const GameServerBase_1 = require("../../common/base/GameServerBase");
const CommonCfg_1 = require("../../common/config/CommonCfg");
class CenterServer extends GameServerBase_1.GameServerBase {
    constructor(app) {
        super(app);
        globalThis.centerGame = this;
    }
    setConfig() {
        super.setConfig();
        let cert = this.getCert();
        this.app.setConfig("mydogList", this.mydogList);
        this.app.setConfig("connector", {
            "connector": mydog_1.connector.Ws,
            "clientOnCb": this.onUserIn.bind(this),
            "clientOffCb": this.onUserLeave.bind(this),
            "interval": 50,
            "noDelay": false,
            "ssl": this.app.env === "production",
            "key": cert.key,
            "cert": cert.cert,
            "heartbeat": 10000
        });
        this.app.configure("center" /* serverType.center */, this.route.bind(this));
        this.app.setKickUserFunc(this.kickUserFunc.bind(this));
    }
    kickUserFunc(uid) {
        let session = this.app.getSession(uid);
        this.sendMsg(uid, { msgHead: "kickUser", msgData: { kickType: CommonCfg_1.KICKUSER_TYPE.REMOTE_LOGININ } });
        session.close();
    }
    route() {
        this.app.route("info" /* serverType.info */, (session) => {
            return game.utilsMgr.getSid(session.uid, "info" /* serverType.info */);
        });
        this.app.route("match" /* serverType.match */, (session) => {
            return game.utilsMgr.getSid(session.uid, "match" /* serverType.match */);
        });
    }
    onUserIn(session) {
    }
    onUserLeave(session) {
        game.app.rpc(game.utilsMgr.getSid(session.uid, "match" /* serverType.match */)).match.main.userLeave(session.uid);
    }
}
exports.CenterServer = CenterServer;
