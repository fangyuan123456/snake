import { SingleBase } from "../base/SingleBase";
import * as protoMethods from "../proto/proto";

export class ProtoManager extends SingleBase{
    constructor(){
        super();
    }
    decode(cmd: number, msg: Buffer){
        let funcName = game.app.getCmdMessageName(cmd);
        //@ts-ignore
        if (protoMethods[funcName] && typeof protoMethods[funcName] === 'function') {
            //@ts-ignore
            return protoMethods[funcName](msg); // 调用对应的方法
          } else {
            console.log('无效的方法名');
          }
    }
    encode(cmd: number, msg: any){
        let funcName = game.app.getCmdMessageName(cmd);
        //@ts-ignore
        if (protoMethods[funcName] && typeof protoMethods[funcName] === 'function') {
            //@ts-ignore
            return protoMethods[funcName](msg); // 调用对应的方法
          } else {
            console.log('无效的方法名');
          }
    }
}