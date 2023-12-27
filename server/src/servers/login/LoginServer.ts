import { ConnectSvrOnLineNumComp } from "../../common/components/ConnectSvrOnLineNumComp";
import { GameServerBase } from "../../common/base/GameServerBase";
import { Application } from "mydog";
import { serverType } from "../../common/config/GameCfg";
export class LoginServer extends GameServerBase{
    svrNumComp:ConnectSvrOnLineNumComp
    constructor(app:Application){
        super(app);
        this.svrNumComp = new ConnectSvrOnLineNumComp(serverType.centor);
    }
    getMinSvrId(){
        return this.svrNumComp.minSvr.id
    }
}