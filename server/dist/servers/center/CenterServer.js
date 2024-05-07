"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CenterServer = void 0;
const GameServerBase_1 = require("../../common/base/GameServerBase");
const Rank_1 = require("./src/system/Rank");
const InviteReward_1 = require("./src/system/InviteReward");
const CenterConfig_1 = require("./src/CenterConfig");
class CenterServer extends GameServerBase_1.GameServerBase {
    constructor(app) {
        super(app);
        globalThis.centerGame = this;
        this.rank = new Rank_1.Rank();
        this.inviteReward = new InviteReward_1.InviteReward();
    }
    setConfig() {
        super.setConfig(CenterConfig_1.bundleInfoKeyCfg, true);
    }
}
exports.CenterServer = CenterServer;
