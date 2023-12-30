import { Application, Session } from "mydog";
import { GameServerBase } from "../../common/base/GameServerBase";
import { serverType } from "../../common/config/GameCfg";


export class CenterServer extends GameServerBase{
    setConfig(): void {
        super.setConfig();
        this.app.configure(serverType.center, this.route.bind(this));
    }
    route(){
        this.app.route(serverType.info, (session: Session) => {
            return game.utilsMgr.getInfoId(session.uid);
        });
    }
}