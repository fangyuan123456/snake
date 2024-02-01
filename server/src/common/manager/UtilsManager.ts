import { Application, ServerInfo } from "mydog";
import { SingleBase } from "../base/SingleBase";
import { serverType } from "../config/CommonCfg";
import * as path from "path";
import { Dic } from "../interface/ICommon";

export class UtilsManager extends SingleBase{
    getSid(uid: number,serverType:serverType) {
        let infoArr =  game.app.serversConfig[serverType]
        return infoArr[uid % infoArr.length].id;
    }
    getServerByUid(uid:number,serverType:serverType){
        let sid = this.getSid(uid,serverType);
        let server = game.app.getServerById(sid);
        return server;
    }
    getServerIp(server:ServerInfo){
        return server.host+":"+server.clientPort
    }
    getCharLen(charCode: number) {
        if (charCode >= 48 && charCode <= 57) { // 0-9
            return 1;
        }
        if (charCode >= 65 && charCode <= 90) { // A-Z
            return 1;
        }
        if (charCode >= 97 && charCode <= 122) { // a-z
            return 1;
        }
        return 2;
    }
    getAppPath(){
        return path.join(__dirname,"../../servers/"+game.app.serverType)
    }
    capitalizeFirstLetter(str: string): string {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    merge(map:{[key:string]:any},newMap:{[key:string]:any}){
        for(let i in newMap){
            map[i] = newMap[i];
        }
        return map;
    }
    deepCopy(obj: any): any {
        if (typeof obj !== 'object' || obj === null) {
          return obj;
        }
        let copy;
        if (Array.isArray(obj)) {
          copy = [];
      
          for (let i = 0; i < obj.length; i++) {
            copy[i] = this.deepCopy(obj[i]);
          }
        } else {
          copy = {};
          for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
              //@ts-ignore
              copy[key] = this.deepCopy(obj[key]);
            }
          }
        }
        return copy;
    }
}