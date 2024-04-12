import { ConfigBase } from "../base/ConfigBase";
import { SingleBase } from "../base/SingleBase";
import { Dic, e_bundleName } from "../interface/I_Common";
export class ConfigManager extends SingleBase{
    tbVar:Dic<any> = {};
    magicKeyCfg:Dic<string> = {Layer:"getLayer"}
    configs:Dic<ConfigBase> = {};
    constructor(){
        super();
    }
    getCfg(tbName:string,callBack:(data:any)=>void,target?:any,bundleName?:e_bundleName){
        let cfg:ConfigBase = null;
        if(!bundleName){
            if(!this.configs["default"]){
                this.configs["default"] = new ConfigBase();
            }
            cfg = this.configs["default"];
        }
        if(cfg){
            return cfg.getCfg(tbName,callBack,target);
        }else{
            game.logMgr.error("bundleName:%s is not load",bundleName)
        }
    }
    initVar(){
        let VAR_CFG:Dic<{target:any,key:string}> = {
            "A":{
                target:game.userData,
                key:"level"
            }
        }
        for(let i in VAR_CFG){
            game.dataBindMgr.bind({
                curData:{
                    target:this.tbVar,
                    key:i
                },
                targetData:{
                    target:VAR_CFG[i].target,
                    key:VAR_CFG[i].key
                }
            },()=>{
                game.eventMgr.dispatch("CFG_VAR_CHANGE",i);
            })
        }
    }

    getDuanWei(score:number){
        return "黄金"
    }
}