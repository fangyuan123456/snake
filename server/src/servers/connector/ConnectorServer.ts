import { Session } from "mydog";
import { GameServerBase } from "../../common/base/GameServerBase";
import { serverType } from "../../common/config/GameCfg";
import { constKey } from "../../app/common/someConfig";

export class ConnectorServer extends GameServerBase{
    setConfig(): void {
        super.setConfig();
        this.app.configure(serverType.connector, this.route);
    }
    route(){
        this.app.route(serverType.info, (session: Session) => {
            return game.utilsMgr.getInfoId(session.uid);
        });
    }
}