import { SingleBase } from "../base/SingleBase";
import { PlatformApiBase } from "../platform/PlatformApiBase";
import * as fs from "fs";
import * as path from "path";
export class PlatformManager extends SingleBase{
    platformApiMap:{[key:string]:PlatformApiBase} = {}
    constructor(){
        super();
    }
    getPlatformApi(platformStr:string):PlatformApiBase{
        let api = this.platformApiMap[platformStr];
        if(api){
            let fileName = path.join(__dirname,"../platform/"+platformStr+"/platformApi.js")
            let handler = require(fileName);
            api = new handler();
            this.platformApiMap[platformStr] = api;
        }
        return api
    }
    getLoginCode(platformStr:string,callBack:(data:any)=>void){
        this.getPlatformApi(platformStr).getLoginCode(callBack);
    }
}