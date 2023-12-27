declare global {
    interface Rpc {
        centor: {
            main: Remote,
        }
    }
}
export default class Remote {
    constructor() {
    }
    getClientNum(cb: (err: number, num: number) => void) {
        cb(0, game.app.clientNum);
    }
}