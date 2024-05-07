
import { I_rankItemInfo } from "../../../../common/interface/ICenter";
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
    setRankInfo(rankInfo:Dic<I_rankItemInfo[]>){
        centerGame.setRankInfo(rankInfo);
    }
    updateRankInfo(uid:number,info:Dic<number>){
        centerGame.updateRankInfo(uid,info)
    }
}