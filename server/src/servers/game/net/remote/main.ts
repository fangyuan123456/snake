declare global {
    interface Rpc {
        game: {
            main: Remote,
        }
    }
}
export default class Remote {
    constructor() {
    }
    createRoom(msg:{roomId:number,uidList:number[]}){
        gameGame.createRoom(msg);
    }
}