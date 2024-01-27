import { Dic } from "../interface/I_Common";

export default class TableBase {
    tbName: string;
    orginData: any;
    data:any;
    resolveList:any[] = [];
    tbVarKeyList:string[] = [];
    varCond:Dic<any> = {};
    constructor(tbName:string) {
        this.tbName = tbName;
    }
    private setOrginData(){
        cc.resources.load("tableCfg/"+this.tbName, (err,jsonAsset:cc.JsonAsset)=> {
            this.orginData = jsonAsset.json;
            this.varCond = this.orginData["var"];
            this.setTbVarKeyList();
            delete this.orginData["var"];
            this.setData();
       })
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
    private  resplceVar(str,varList){
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
                        let newStr = matchStr.replace(i,"game.configMgr."+game.configMgr.magicKeyCfg[i])
                        let evalData =await eval(newStr)
                        str = str.replace(matchStr,evalData+"")
                    }  
                }
            }
            resolve(eval(str));
        })
    }
    public async setData(){
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
        this.callResolveFunc();
    }
    private callResolveFunc(){
        let data = this.data;
        if(data){
            for(let i = this.resolveList.length-1;i>=0;i--){
                let target = this.resolveList[i].target;
                let callBack = this.resolveList[i].callBack;
                if(!target || (target&&target.node && target.node.parent)){
                    callBack(data);
                }else{
                    this.resolveList.splice(i,1);
                }
            } 
        }
    }
    getData(callBack:(data:any)=>void,target?:any){
        this.resolveList.push({
            target:target,
            callBack:callBack
        });
        this.callResolveFunc();
        if(!this.orginData){
            this.setOrginData();
        }
    }
}