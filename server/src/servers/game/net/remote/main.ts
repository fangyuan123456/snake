import RemoteBase from "../../../../common/base/RemoteBase";
import { e_roomType } from "../../../../common/interface/IGame";

declare global {
    interface Rpc {
        game: {
            main: Remote,
        }
    }
}
export default class Remote extends RemoteBase {
    constructor() {
        super();
    }
    createRoom(msg:{roomId:number,uidList:number[],roomType:e_roomType}){
        gameGame.createRoom(msg);
    }
}