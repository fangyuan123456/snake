import { SingleBase } from "../base/SingleBase";
import { Root, Type, load, loadSync } from "protobufjs";
export class ProtoManager extends SingleBase{
    rootMap:{[key:string]:Root} = {};
    encodeDecodeFuncMap:{[key:string]:Type} = {};
    constructor(){
        super();
    }
    getEncodeDecodeFunc(pbName:string){

      if(!this.encodeDecodeFuncMap[pbName]){
        let root = this.rootMap[game.app.serverType]
        if(!root){
           root = loadSync(__dirname+"/../proto/"+game.app.serverType+".json")
           this.rootMap[game.app.serverType] = root;
        }
        this.encodeDecodeFuncMap[pbName] = root.lookupType(pbName);
      }
      return this.encodeDecodeFuncMap[pbName]
    }
    getProtoCode(pbName:string){
      let routeConfig = game.app.routeConfig;
      for(let i in routeConfig){
        let str = routeConfig[i];
        if(str.endsWith("."+pbName)){
          return Number(i);
        }
      }
    }
    decode(cmd: number, msg: Buffer):any{
        let routeUrl = game.app.routeConfig[cmd]
        let strArr = routeUrl.split(".")
        let funcName = strArr[strArr.length-1];
        let pbName = game.app.serverType+"."+funcName+"Req";
        return this.getEncodeDecodeFunc(pbName).decode(msg);
    }
    encode(cmd: number, msg: any):Buffer{
      let routeUrl = game.app.routeConfig[cmd]
      let strArr = routeUrl.split(".")
      let funcName = strArr[strArr.length-1];
      let pbName = game.app.serverType+"."+funcName+"Res";
      let decoder = this.getEncodeDecodeFunc(pbName)
      let message = decoder.create(msg);
      let buffer = decoder.encode(message).finish();
      return Buffer.from(buffer);
    }
}