import { Response } from "express";
import { LoginServer } from "../../LoginServer";

export default class Handler {
    constructor() {
    }
    onLoginHandler(msgData:any,res:Response){
        // let centorIp = rpc.ge
        // app.rpc(this.roleMem.mapSvr).map.main.isMapOk(this.role.mapId, this.roleMem.mapIndex, this.uid, (err, ok) => {
        // let centorId = game.app.rpc()

        game.httpMgr!.sendMsg({
            url:game
        },res);
    }
}