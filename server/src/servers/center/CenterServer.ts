import { Application, Session, connector } from "mydog";
import { GameServerBase } from "../../common/base/GameServerBase";
import { Rank } from "./src/system/Rank";
import { InviteReward } from "./src/system/InviteReward";
import { bundleInfoKeyCfg } from "./src/CenterConfig";
declare global{
    namespace globalThis{
        var centerGame:CenterServer
    }
}

export class CenterServer extends GameServerBase{
    rank:Rank;
    inviteReward:InviteReward
    constructor(app:Application){
        super(app);
        globalThis.centerGame = this;
        this.rank = new Rank();
        this.inviteReward = new InviteReward();
    }
    setConfig(): void {
        super.setConfig(bundleInfoKeyCfg,true);
    }
}