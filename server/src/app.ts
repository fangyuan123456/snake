import { createApp } from "mydog";
import { serverType } from "./common/config/GameCfg";
import { LoginServer } from "./servers/login/LoginServer";
import { InfoServer } from "./servers/info/InfoServer";
import { ConnectorServer } from "./servers/connector/ConnectorServer";

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
        case serverType.connector:
            new ConnectorServer(app);
        break
    }
}
CreateServerApp();

