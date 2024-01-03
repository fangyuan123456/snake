declare global {
    interface Rpc {
        center: {
            main: Remote,
        }
    }
}
export default class Remote {
    constructor() {
    }
    getClientNum() {
        return game.app.clientNum
    }
}