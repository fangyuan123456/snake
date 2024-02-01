import { SingleBase } from "../base/SingleBase";
import { Root, Type, load, loadSync } from "protobufjs";
import { serverType } from "../config/CommonCfg";
import { I_msg, MSG_TYPE } from "../interface/ICommon";
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
    decodeMsg(data:Buffer){
      let msgLen = data.readUInt32BE(0);
      let msgHead = "";
      let msgData = null;
      let type = data.readUint8(4);
      if(type == MSG_TYPE.handshake){
        msgData = JSON.parse(data.slice(5).toString());
      }else if(type == MSG_TYPE.msg){
        let cmd = data.readUInt16BE(5);
        let routeUrl = game.app.routeConfig[cmd];
        let strArr = routeUrl.split(".");
        msgHead = strArr[strArr.length-1];
        msgData = game.protoMgr.decode(cmd,data.slice(7));
      }
      let msg = {
        msgHead:"msgHead",
        msgType:type,
        msgData:msgData
      }
      return msg;
    }
    encodeMsg(msg:I_msg){
      let dataBuffer = null;
      let msgBuffer = null;
      let len = 5;
      if(msg.msgType == MSG_TYPE.handshake){
        dataBuffer = Buffer.from(msg.msgData);
        len+=dataBuffer.length;
        msgBuffer = Buffer.alloc(len);
      }else{

      }
    }
}