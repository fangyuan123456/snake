import RemoteBase from "../../../../common/base/RemoteBase"
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
    updateRankScore(scoreData:Dic<{score:number,type:string}>){
        centerGame.updateRankScore(scoreData);
    }
    playerOnLine(){

    }
    playerOffLine(){
        
    }
}