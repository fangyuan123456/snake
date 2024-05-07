import { GameServerBase } from "../../common/base/GameServerBase";
import { Application } from "mydog";
import { serverType } from "../../common/config/CommonCfg";
import { I_roleInfo } from "../../common/interface/IInfo";
import { bundleInfoKeyCfg } from "./src/LoginConfig";
declare global{
    namespace globalThis{
        var loginGame:LoginServer
    }
}
export class LoginServer extends GameServerBase{
    constructor(app:Application){
        super(app);
        globalThis.loginGame = this;
    }
    setConfig(){
        super.setConfig(bundleInfoKeyCfg)
    }
}