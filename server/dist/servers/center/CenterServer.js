"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CenterServer = void 0;
const GameServerBase_1 = require("../../common/base/GameServerBase");
class CenterServer extends GameServerBase_1.GameServerBase {
    setConfig() {
        super.setConfig();
        this.app.configure("center" /* serverType.center */, this.route.bind(this));
    }
    route() {
        this.app.route("info" /* serverType.info */, (session) => {
            return game.utilsMgr.getInfoId(session.uid);
        });
    }
}
exports.CenterServer = CenterServer;
