import { Application, Session } from "mydog";
import { GameServerBase } from "../../common/base/GameServerBase";
import { serverType } from "../../common/config/CommonCfg";
declare global{
    namespace globalThis{
        var centerGame:CenterServer
    }
}

export class CenterServer extends GameServerBase{
    constructor(app:Application){
        super(app);
        globalThis.centerGame = this;
    }
    setConfig(): void {
        super.setConfig();
        this.app.configure(serverType.center, this.route.bind(this));
    }
    route(){
        this.app.route(serverType.info, (session: Session) => {
            return game.utilsMgr.getSid(session.uid,serverType.info);
        });
    }
}