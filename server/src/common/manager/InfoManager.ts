import { SingleBase } from "../base/SingleBase";
import { serverType } from "../config/CommonCfg";
import { Dic } from "../interface/ICommon";
export class InfoManager extends SingleBase{
    playerInfo:Dic<Dic<any>> = {};
    private getInfoServer(uid:number){
        if(infoGame){
            return infoGame
        }else{
            return game.app.rpc(game.utilsMgr.getSid(uid,serverType.info)).info.main
        }
    }
    async getPlayerInfo(uid:number,info?:Dic<any>){
        if(infoGame){
            return infoGame.getPlayerInfo(uid,info);
        }else{
            if(this.playerInfo[uid]){
                return this.playerInfo[uid]
            }else{
                let playerInfo  =  await this.getInfoServer(uid)!.getPlayerInfo(uid,info);
                this.playerInfo[uid] = playerInfo;;
            }
           return this.playerInfo[uid];
        }
    }
    setPlayerInfo(uid:number,info:Dic<any>){
        if(infoGame){
            infoGame.setPlayerInfo(uid,info);
        }else{
            if(this.playerInfo[uid]){
                for(let infoKey in info){
                    let data = info[infoKey];
                    this.playerInfo[uid][infoKey] = data;
                }
            }
            this.getInfoServer(uid)!.setPlayerInfo(uid,info);
        }
    }
    async changePlayerInfo(uid:number,info:Dic<any>){
        let  orginInfo = await this.getPlayerInfo(uid,info);
        let resetInfo:Dic<any> = {}
        for(let i in info){
            if(typeof orginInfo[i] == "number" && typeof info[i] == "number"){
                orginInfo[i] = orginInfo[i]+=info[i];
            }else if(orginInfo[i] instanceof Array){
                let infoArr = info[i];
                if(!(info[i] instanceof Array)){
                    infoArr = [info[i]];
                }
                for(let index in infoArr){
                    let infoData = infoArr[index]
                    if(orginInfo[i].indexOf(infoData)<0){
                        orginInfo[i].push(infoData);
                    }
                }
            }else if(orginInfo[i] instanceof Object){
                let orginData = orginInfo[i];
                for(let key in info[i]){
                    orginData[key] +=info[i][key]
                }
            }
            resetInfo[i] = orginInfo[i];
        }
        this.getInfoServer(uid)!.setPlayerInfo(uid,resetInfo);
    }
    async getInfoByBundle<T>(uid:number,bundleName:string):Promise<T>{
        let info = await this.getPlayerInfo(uid);
        let bundleInfoKeyCfg = game.bundleInfoKeyCfg;
        let cfgDic = bundleInfoKeyCfg[bundleName];
        if(!cfgDic){
            game.logMgr.error("infoBundleName:%s is not cfg",bundleName)
            return {} as T;
        }else{
            let bundleInfo:Dic<any> = {};
            for(let i in cfgDic){
                bundleInfo[cfgDic[i]] =  info[i]
            }
            return bundleInfo as T;
        }
    }
}