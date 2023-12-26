"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CentorServer = void 0;
const GameServerBase_1 = require("../../common/base/GameServerBase");
class CentorServer extends GameServerBase_1.GameServerBase {
    setConfig() {
        super.setConfig();
        this.app.configure("centor" /* serverType.centor */, this.route);
    }
    route() {
        this.app.route("info" /* serverType.info */, (session) => {
            return game.utilsMgr.getInfoId(session.uid);
        });
    }
}
exports.CentorServer = CentorServer;
