declare global {
    interface Rpc {
        info: {
            main: Remote,
        }
    }
}
export default class Remote {
    constructor() {
    }
    async getInfo(uid:number){
        return {
            haha:1
        }
    }
}