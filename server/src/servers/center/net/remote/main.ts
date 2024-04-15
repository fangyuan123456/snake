
import { Dic } from "../../../../common/interface/ICommon";

declare global {
    interface Rpc {
        center: {
            main: Remote,
        }
    }
}
export default class Remote {
    notifyCleanInfo(uid:number){
        game.infoMgr.onNotifyCleanPlayerInfo(uid);
    }
    notifySetInfo(uid:number,info:Dic<any>){
        game.infoMgr.onNotifyPlayerInfoUpdate(uid,info);
    }
}