import { SingleBase } from "../base/SingleBase";
import TableBase from "../base/TableBase";
import { Dic } from "../interface/ICommon";
export class ConfigManager extends SingleBase{
    tbVar:Dic<any> = {"A":1,"B":1};
    magicKeyCfg:Dic<string> = {Layer:"getLayer"}
    tables:Dic<TableBase> = {};
    constructor(){
        super();
    }
    private setTbVar(tbVar:Dic<any>){
        for(let i in tbVar){
            this.tbVar[i] = tbVar[i];
        }
        this.resetTbValueByVar(tbVar);
    }
    private resetTbValueByVar(tbVar:Dic<any>){
        for(let i in this.tables){
            let tbVarKeyList = this.tables[i].tbVarKeyList;
            for(let j in tbVarKeyList){
                if(tbVar[tbVarKeyList[j]]){
                    this.tables[i].setData();
                }
            }
        }
    }
    getCfg(tbName:string,target:any){
        if(!this.tables[tbName]){
            this.tables[tbName] = new TableBase(tbName);
        }
        return this.tables[tbName].getData(target);
    }
    getLayer(key:string,value:number,tbName:string = "userLayer"){
        if(!this.tables[tbName]){
            this.tables[tbName] = new TableBase(tbName);
        }
        return new Promise<number>((resolve, reject) => {
            this.tables[tbName].getData((data)=>{
                let dataValue = 0;
                let layer = data[key].layer;
                for(let i in layer){
                    if(value>=Number(i)){
                        dataValue = layer[i];
                    }
                }
                resolve(dataValue);
            })
        })
    }
}