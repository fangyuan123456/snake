import { SceneBase } from "../base/SceneBase";
import { SingleBase } from "../base/SingleBase";
import { Dic } from "../interface/I_Common";
import { ObservableProxy } from "./DataBindManager";
export enum e_STROGE_KEY{
    SOUND_STROGE_KEY = "SOUND_STROGE_KEY"
}
export class StorgeManager extends SingleBase{
    cfgStrogeMap:Dic<any> = {};
    getItems(itemKeyList:string[]){
        let itemData:Dic<any> = {};
        for(let i in itemKeyList){
            itemData[itemKeyList[i]] = this.getItem(itemKeyList[i]);
        }
        return itemData;
    }
    getItem(itemKey:string){
        let dataStr = cc.sys.localStorage.getItem(itemKey);
        let data = null;
        try{
            data = JSON.parse(dataStr)
        }catch(e){
            data = dataStr;
        }
        return data;
    }
    setItems(itemData:Dic<any>){
        for(let i in itemData){
            this.setItem(i,itemData[i]);
        }
    }
    setItem(itemKey:string,data:any){
        if(data){
            let putData = "";
            if(typeof(data) == "boolean" || typeof(data) == "number"){
                putData = data + "";
            }else if(typeof(data) == "object"){
                putData = JSON.stringify(data);
            }
            cc.sys.localStorage.setItem(itemKey,putData)
        }else{
            cc.sys.localStorage.removeItem(itemKey);
        }
    }
    setCfgStroge(itemData:Dic<any>){
        for(let cfgName in itemData){
            this.cfgStrogeMap[cfgName] = itemData[cfgName];
        }
        game.storgeMgr.setItems(itemData);
    }
    getCfgStroge(cfgName:string){
        if(!this.cfgStrogeMap[cfgName]){
            let cfg = this.getItem(cfgName);
            if(cfg){
                this.cfgStrogeMap[cfgName] = cfg;
            }
        }
        return this.cfgStrogeMap[cfgName] 
    }
    bindStrogeKey(data:{target:any,key:string},strogeKey:e_STROGE_KEY){
        let proxy = new ObservableProxy(data);
        proxy.addObserver((value: any) => {
            this.setItem(strogeKey,value);
        });
        if(this.getItem(strogeKey)){
            data.target[data.key] =  this.getItem(strogeKey);
        }
    }
    async checkVersionInvildAndClean(){
        let storage = game.storgeMgr.getItem("version");
        let cfg = await game.resMgr.loadCfg("version");
        if(storage){
            let isInvild = game.utilsMgr.comporeVersion(cfg.version,storage.version);
            if(!isInvild){
                let clearData:Dic<any> = {}
                clearData["version"] = null;
                for(let i in cfg.versionMap){
                    clearData[i] = null;
                }
                game.storgeMgr.setItems(clearData);
            }
        }
    }
    clearAllStroge(){
        for(let i in e_STROGE_KEY){
            this.setItem(e_STROGE_KEY[i],null)
        }
    }
}