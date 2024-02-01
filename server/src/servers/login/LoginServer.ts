import { GameServerBase } from "../../common/base/GameServerBase";
import { Application } from "mydog";
import { serverType } from "../../common/config/CommonCfg";
import { I_roleInfo } from "../../common/interface/IInfo";
import { ChatGptManager } from "../../common/manager/ChatGptManager";
declare global{
    namespace globalThis{
        var loginGame:LoginServer
    }
}
export class LoginServer extends GameServerBase{
    // gptMgr:ChatGptManager
    constructor(app:Application){
        super(app);
        globalThis.loginGame = this;
        // this.gptMgr = ChatGptManager.getInstance();
        // this.gptMgr.test();
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