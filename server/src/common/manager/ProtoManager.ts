import { SingleBase } from "../base/SingleBase";

export class ProtoManager extends SingleBase{
    constructor(){
        super();
        this.loadProto();
    }
    loadProto(){

    }
    decode(cmd: number, msg: Buffer){
        return JSON.parse(msg.toString());
    }
    encode(cmd: number, msg: any){
        return Buffer.from(JSON.stringify(msg));
    }
}