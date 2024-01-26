import { SingleBase } from "../base/SingleBase";
import { Root, Type, load, loadSync } from "protobufjs";
import { serverType } from "../config/GameCfg";
export class ProtoManager extends SingleBase{
    rootMap:{[key:string]:Root} = {};
    encodeDecodeFuncMap:{[key:string]:Type} = {};
    constructor(){
        super();
    }
    getEncodeDecodeFunc(pbName:string){
      if(!this.encodeDecodeFuncMap[pbName]){
        let serverName = pbName.split(".")[0];
        let root = this.rootMap[serverName]
        if(!root){
           root = loadSync(__dirname+"/../proto/"+serverName+".json")
           this.rootMap[serverName] = root;
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
    getServerName(cmd:number):serverType{
      let routeUrl = game.app.routeConfig[cmd]
      let strArr = routeUrl.split(".")
      // @ts-ignore
      return strArr[0];
    }
    decode(cmd: number, msg: Buffer):any{
        let routeUrl = game.app.routeConfig[cmd]
        let strArr = routeUrl.split(".")
        let funcName = strArr[strArr.length-1];
        let pbName = strArr[0]+"."+funcName+"Req";
        return this.getEncodeDecodeFunc(pbName).decode(msg);
    }
    encode(cmd: number, msg: any):Buffer{
      game.logMgr.debug("cmd:%d,msg:%s",cmd,JSON.stringify(msg));
      let routeUrl = game.app.routeConfig[cmd]
      let strArr = routeUrl.split(".")
      let funcName = strArr[strArr.length-1];
      let pbName = strArr[0]+"."+funcName+"Res";
      let decoder = this.getEncodeDecodeFunc(pbName)
      let message = decoder.create(msg);
      let buffer = decoder.encode(message).finish();
      return Buffer.from(buffer);
    }
}