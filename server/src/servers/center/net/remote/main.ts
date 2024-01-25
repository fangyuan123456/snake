import RemoteBase from "../../../../common/base/RemoteBase"

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
}