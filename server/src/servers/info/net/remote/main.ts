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
    getInfo(uid:number){
        let infoGame = game as InfoServer;
        return infoGame.getInfoData(uid);
    }
}