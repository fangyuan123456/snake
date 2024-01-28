import { Dic } from "../interface/ICommon";


export default class TableBase {
    tbName: string;
    orginData: any;
    data:any;
    getCfgCallBackList:any[] = [];
    tbVarKeyList:string[] = [];
    varCond:Dic<any> = {};
    constructor(tbName:string) {
        this.tbName = tbName;
    }
    private setOrginData(){
        let jsonData = require("../config/tables/"+this.tbName)
        this.orginData = jsonData;
        if(this.orginData["var"]){
            this.varCond = this.orginData["var"];
            this.setTbVarKeyList();
            delete this.orginData["var"];
        }
    }
    private setTbVarKeyList(){
        for(let i in this.varCond){
            for(let j in this.varCond[i]){
                if(this.tbVarKeyList.indexOf(this.varCond[i][j])<0){
                    this.tbVarKeyList.push(this.varCond[i][j])
                }
            }
        }
    }
    private  resplceVar(str:string,varList:string[]){
        return new Promise<number>(async (resolve, reject) => {
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
                        let funcStr = matchStr.replace(i,"game.configMgr."+game.configMgr.magicKeyCfg[i])
                        let evalData =await eval(funcStr)
                        str = str.replace(matchStr,evalData+"")
                    }  
                }
            }
            resolve(eval(str));
        })
    }
    onVarChange(){
        this.setData();
    }
    async setData(){
        this.data = {};
        for(let i in this.orginData){
            this.data[i] = game.utilsMgr.deepCopy(this.orginData[i]);
            for(let key in this.varCond){
                let data = this.data[i][key];
                if(typeof data == 'object'){
                    for(let j in data){
                        this.data[i][key][j] = await this.resplceVar(data[j],this.varCond[key])
                    }
                }else{
                    this.data[i][key] = await this.resplceVar(data,this.varCond[key])
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
                if(!target || (target&&target.node && target.node.parent)){
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
}