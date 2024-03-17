import { SingleBase } from "../base/SingleBase";
import { I_loginReq, I_sdkLoginRes } from "../interface/ILogin";
import { PlatformApiBase } from "../platform/PlatformApiBase";
import * as fs from "fs";
import * as path from "path";
export class PlatformManager extends SingleBase{
    platformApiMap:{[key:string]:PlatformApiBase} = {}
    constructor(){
        super();
    }
    getPlatformApi(platform:string):PlatformApiBase{
        let api = this.platformApiMap[platform];
        if(!api){
            let fileName = path.join(__dirname,"../platform/"+platform+"/platformApi.js")
            let handler = null;
            try{
                handler = require(fileName).platformApi;
            }catch{
                fileName = path.join(__dirname,"../platform/PlatformApiBase.js")
                handler = require(fileName).PlatformApiBase;
            }
            api = new handler();
            this.platformApiMap[platform] = api;
        }
        return api
    }
    getLoginCode(data:I_loginReq,callBack:(data:I_sdkLoginRes)=>void){
        if(data.isCeShi){
            if(callBack){
                callBack({
                    openId : data.code!
                });
            }
        }else{
            this.getPlatformApi(data.platform).getLoginCode(data,callBack);
        }
  
    }
}