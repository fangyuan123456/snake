import { GameServerBase } from "../../common/base/GameServerBase";
import { Application } from "mydog";
import { serverType } from "../../common/config/GameCfg";
import { I_roleInfo } from "../../common/interface/IInfo";
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
    getDefaultUserData(uid:number):I_roleInfo{
        return {
            uid:uid,
            openId:"",
            nickName:"uid_"+uid,
            avatarUrl:"",
        }
    }
}