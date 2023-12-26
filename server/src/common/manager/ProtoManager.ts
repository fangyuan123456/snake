import { SingleBase } from "../base/SingleBase";
import * as proto from "../proto/proto";

export class ProtoManager extends SingleBase{
    constructor(){
        super();
    }
    decode(cmd: number, msg: Buffer){
        // let data = game.app.cmdConfig[cmd];
        let funcName = game.app.getCmdMessageName(cmd);
        // if(proto[funcName]){

        // }
    }
    encode(cmd: number, msg: any){
        return Buffer.from(JSON.stringify(msg));
    }
}