import { Dic, e_bundleName } from "../interface/I_Common";
import { ConfigBase } from "./ConfigBase";


export default class TableBase {
    tbName: string;
    orginData: any;
    data:any;
    configComp:ConfigBase
    bundleName:e_bundleName = null;
    getCfgCallBackList:any[] = [];
    extableCfgData:Dic<any> = {};
    varCond:Dic<any> = {};
    constructor(tbName:string,bundleName?:e_bundleName,configComp?:ConfigBase) {
        this.tbName = tbName;
        this.bundleName = bundleName;
        this.configComp = configComp;
    }
    private setOrginData(){
        game.resMgr.loadCfg(this.tbName,this.bundleName).then((data)=>{
            this.orginData = game.utilsMgr.deepCopy(data);
            if(this.orginData["var"]){
                this.varCond = this.orginData["var"];
                this.onVarEventListener();
                delete this.orginData["var"];
            }
            if(this.orginData["extable"]){
                for(let i in this.orginData["extable"]){
                    let cfgs = this.orginData["extable"][i];
                    for(let j in cfgs){
                        this.extableCfgData[cfgs[j]] = null;
                    }
                }
                delete this.orginData["extable"];
            }
            this.loadAllExTable(()=>{
                this.setData();
            })
        })
    }
    private onVarEventListener(){
        game.eventMgr.on("CFG_VAR_CHANGE",this.onVarChange.bind(this))

    }
    private loadAllExTable(callBack:()=>void){
        if(Object.keys(this.extableCfgData).length>0){
            let callEndFunc = ()=>{
                for(let i in this.extableCfgData){
                    if(!this.extableCfgData[i]){
                        return;
                    }
                }
                callBack();
            }
            for(let i in this.extableCfgData){
                this.configComp.getCfg(i,(data)=>{
                    this.extableCfgData[i] = data;
                    callEndFunc();
                })
            }
        }else{
            callBack();
        }
    }
    private  resplceVar(str:string,varList:string[]){
        for(let i in varList){
            if(game.configMgr.tbVar[varList[i]]){
                str = str.replace(varList[i],game.configMgr.tbVar[varList[i]])
            }else{
                game.logMgr.error("var:%d is not set",game.configMgr.tbVar[varList[i]])
            }
        }
        for(let i in game.configMgr.magicKeyCfg){
            const regexString = i + "\\([^()]*\\)";
            const match = str.match(regexString);
            if(match){
                for(let j =  0;j<match.length;j++){
                    let matchStr:string = match[j];
                    let funcStr = matchStr.replace(i,"this.configComp."+game.configMgr.magicKeyCfg[i])
                    let evalData = eval(funcStr)
                    str = str.replace(matchStr,evalData+"")
                }  
            }
        }
        return eval(str);
    }
    onVarChange(varKey){
        for(let i in this.varCond){
            for(let j in this.varCond[i]){
                if(varKey == this.varCond[i][j]){
                    this.setData();
                    return;
                }
                
            }
        }
    }
    setData(){
        this.data = {};
        for(let i in this.orginData){
            this.data[i] = game.utilsMgr.deepCopy(this.orginData[i]);
            for(let key in this.varCond){
                let data = this.data[i][key];
                if(typeof data == 'object'){
                    for(let j in data){
                        this.data[i][key][j] = this.resplceVar(data[j],this.varCond[key])
                    }
                }else{
                    this.data[i][key] = this.resplceVar(data,this.varCond[key])
                }
            }
        }
        this.callGetCfgFunc();
    }
    private callGetCfgFunc(){
        let data = this.data;
        if(data){
            for(let i = this.getCfgCallBackList.length-1;i>=0;i--){
                let target = this.getCfgCallBackList[i].target;
                let callBack = this.getCfgCallBackList[i].callBack;
                if(!target || target.isValid){
                    callBack(data);
                    if(this.getCfgCallBackList[i].isCallOnce){
                        this.getCfgCallBackList.splice(i,1);
                    }
                }else{
                    this.getCfgCallBackList.splice(i,1);
                }
            } 
        }
    }
    getDataSync(){
        return this.data;
    }
    getData(callBack:(data:any)=>void,target?:any,isCallOnce?:boolean){
        this.getCfgCallBackList.push({
            target:target,
            isCallOnce:isCallOnce,
            callBack:callBack
        });
        this.callGetCfgFunc();
        if(!this.orginData){
            this.setOrginData();
        }
    }
    private offVarEventListener(){
        game.eventMgr.remove("CFG_VAR_CHANGE",this.onVarChange.bind(this));
    }
    destroy(){
        this.offVarEventListener();
    }
}