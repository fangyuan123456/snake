import { createApp } from "mydog";
import { serverType } from "./common/config/CommonCfg";
import { LoginServer } from "./servers/login/LoginServer";
import { InfoServer } from "./servers/info/InfoServer";
import { CenterServer } from "./servers/center/CenterServer";
import { MatchServer } from "./servers/match/MatchServer";
import { GameServer } from "./servers/game/GameServer";

let CreateServerApp=function(){
    let app = createApp();
    switch(app.serverType){
        case serverType.master:
            app.start();
        break;
        case serverType.login:
            new LoginServer(app);
        break;
        case serverType.info:
            new InfoServer(app);
        break;
        case serverType.center:
            new CenterServer(app);
        break;
        case serverType.match:
            new MatchServer(app);
        break
        case serverType.game:
            new GameServer(app);
        break
    }
}
CreateServerApp();

