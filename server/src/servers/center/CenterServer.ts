import { Application, Session, connector } from "mydog";
import { GameServerBase } from "../../common/base/GameServerBase";
import { KICKUSER_TYPE, serverType } from "../../common/config/CommonCfg";
declare global{
    namespace globalThis{
        var centerGame:CenterServer
    }
}

export class CenterServer extends GameServerBase{
    constructor(app:Application){
        super(app);
        globalThis.centerGame = this;
    }
    setConfig(): void {
        super.setConfig();
        let cert = this.getCert();
        this.app.setConfig("mydogList", this.mydogList);
        this.app.setConfig("connector", {
            "connector": connector.Ws,
            "clientOnCb": this.onUserIn.bind(this),
            "clientOffCb": this.onUserLeave.bind(this),
            "interval": 50,
            "noDelay": false,
            "ssl": this.app.env === "production",
            "key": cert.key,
            "cert": cert.cert,
            "heartbeat":10000
        });
        this.app.configure(serverType.center, this.route.bind(this));
        this.app.setKickUserFunc(this.kickUserFunc.bind(this))
    }
    kickUserFunc(uid:number){
        let session = this.app.getSession(uid);
        this.sendMsg(uid,{msgHead:"kickUser",msgData:{kickType:KICKUSER_TYPE.REMOTE_LOGININ}})
        session.close();
    }
    route(){
        this.app.route(serverType.info, (session: Session) => {
            return game.utilsMgr.getSid(session.uid,serverType.info);
        });
        this.app.route(serverType.match, (session: Session) => {
            return game.utilsMgr.getSid(session.uid,serverType.match);
        });
    }
    onUserIn(session:Session){

    }
    onUserLeave(session:Session){
        game.app.rpc(game.utilsMgr.getSid(session.uid,serverType.match)).match.main.userLeave(session.uid);
    }
}