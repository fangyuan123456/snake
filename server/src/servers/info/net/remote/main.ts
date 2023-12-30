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
    async getInfo(uid:number){
        let infoGame = game as InfoServer;
        await infoGame.getInfoData(uid);
    }
}