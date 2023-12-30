import { Dic } from "../interface/ICommon";
export class SqlUpdateBase{
    tb_name:string = ""
    whileUpdateKeyList:Dic<any> = {}
    constructor(tb_name:string){
        this.tb_name = tb_name;
    }
    updateSqlValue(data:Dic<any>){
        for(let i in data){
            this.whileUpdateKeyList[data[i].key] = data[i].value
        }
    }
    doSqlUpdate(cond?:Dic<any>){
        if(Object.keys(this.whileUpdateKeyList).length > 0){
            game.sqlMgr.update(this.tb_name,this.whileUpdateKeyList,cond)
            this.whileUpdateKeyList = {};
        }
  
    }
}