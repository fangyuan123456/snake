import { I_roleInfo } from "../../../../common/interface/IInfo";
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
    createPlayer(role:I_roleInfo){
        let infoGame = game as InfoServer;
        infoGame.createPlayer(role);
    }
}