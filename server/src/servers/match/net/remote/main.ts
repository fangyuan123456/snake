import RemoteBase from "../../../../common/base/RemoteBase";
declare global {
    interface Rpc {
        match: {
            main: Remote,
        }
    }
}
export default class Remote extends RemoteBase {
    constructor() {
        super();
    }
    userLeave(uid:number){
        matchGame.userLeave(uid);
    }
}