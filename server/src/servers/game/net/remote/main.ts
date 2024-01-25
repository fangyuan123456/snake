import RemoteBase from "../../../../common/base/RemoteBase";

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
    createRoom(msg:{roomId:number,uidList:number[]}){
        gameGame.createRoom(msg);
    }
}