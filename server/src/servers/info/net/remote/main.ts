import { InfoServer } from "../../InfoServer";

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
    createPlayerInfo(uid:number){
        let infoGame = game as InfoServer;
        infoGame.createPlayerInfo(uid);
    }
}