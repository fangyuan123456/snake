import RemoteBase from "../../../../common/base/RemoteBase"
import { I_rankItemInfo } from "../../../../common/interface/ICenter";
import { Dic } from "../../../../common/interface/ICommon";

declare global {
    interface Rpc {
        center: {
            main: Remote,
        }
    }
}
export default class Remote extends RemoteBase {
    constructor() {
        super();
    }
    getClientNum() {
        return game.app.clientNum
    }
    setRankInfo(rankInfo:Dic<I_rankItemInfo[]>){
        centerGame.setRankInfo(rankInfo);
    }
    updateRankInfo(uid:number,info:Dic<number>){
        centerGame.updateRankInfo(uid,info)
    }
    playerOnLine(){

    }
    playerOffLine(){
        
    }
}