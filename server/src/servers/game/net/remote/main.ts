import { Dic } from "../../../../common/interface/ICommon";
import { e_roomType } from "../../../../common/interface/IGame";

declare global {
    interface Rpc {
        game: {
            main: Remote,
        }
    }
}
export default class Remote{
    constructor() {
    }
    notifyCleanInfo(uid:number){
        game.infoMgr.onNotifyCleanPlayerInfo(uid);
    }
    notifySetInfo(uid:number,info:Dic<any>){
        game.infoMgr.onNotifyPlayerInfoUpdate(uid,info);
    }
    createRoom(msg:{roomId:number,uidList:number[],roomType:e_roomType}){
        gameGame.createRoom(msg);
    }
}