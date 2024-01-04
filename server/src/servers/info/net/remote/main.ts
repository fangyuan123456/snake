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
    async getInfoData(uid:number){
        let infoGame = game as InfoServer;
        return await infoGame.getInfoData(uid);
    }
}