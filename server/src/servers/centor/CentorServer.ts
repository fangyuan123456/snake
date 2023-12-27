import { Application, Session } from "mydog";
import { GameServerBase } from "../../common/base/GameServerBase";
import { serverType } from "../../common/config/GameCfg";


export class CentorServer extends GameServerBase{
    setConfig(): void {
        super.setConfig();
        this.app.configure(serverType.centor, this.route);
    }
    route(){
        this.app.route(serverType.info, (session: Session) => {
            return game.utilsMgr.getInfoId(session.uid);
        });
    }
}