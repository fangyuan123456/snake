import { ConnectSvrOnLineNumComp } from "../../common/components/ConnectSvrOnLineNumComp";
import { GameServerBase } from "../../common/base/GameServerBase";
import { Application } from "mydog";
import { serverType } from "../../common/config/GameCfg";
declare global{
    namespace globalThis{
        var loginGame:LoginServer
    }
}
export class LoginServer extends GameServerBase{
    constructor(app:Application){
        super(app);
        loginGame = this;
        this.svrNumComp = new ConnectSvrOnLineNumComp(serverType.center);
    }
}