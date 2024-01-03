import { SingleBase } from "../base/SingleBase";
import { Root, Type, load, loadSync } from "protobufjs";
export class ProtoManager extends SingleBase{
    root:Root|null = null;
    encodeDecodeFuncMap:{[key:string]:Type} = {};
    constructor(){
        super();
    }
    getEncodeDecodeFunc(pbName:string){
      if(!this.encodeDecodeFuncMap[pbName]){
        if(!this.root){
          this.root = loadSync("../proto/"+game.app.serverType+".proto")
        }
        this.encodeDecodeFuncMap[pbName] = this.root.lookupType(pbName);
      }
      return this.encodeDecodeFuncMap[pbName]
    }
    decode(cmd: number, msg: Buffer):any{
        let routeUrl = game.app.routeConfig[cmd]
        let strArr = routeUrl.split(".")
        let funcName = strArr[strArr.length-1];
        let pbName = game.app.serverType+".CS_"+funcName;
        return this.getEncodeDecodeFunc(pbName).decode(msg);
    }
    encode(cmd: number, msg: any):Buffer{
      let routeUrl = game.app.routeConfig[cmd]
      let strArr = routeUrl.split(".")
      let funcName = strArr[strArr.length-1];
      let pbName = game.app.serverType+".SC_"+funcName;
      let decoder = this.getEncodeDecodeFunc(pbName)
      let message = decoder.create(msg);
      let buffer = decoder.encode(message).finish();
      return Buffer.from(buffer);
    }
}