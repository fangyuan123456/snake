import { Dic } from "../interface/ICommon";
import { TableName } from "../manager/SqlManager";
export class SqlBase{
    cond:Dic<any> = null!
    tb_name:TableName
    whileUpdateKeyList:Dic<any> = {}
    constructor(tb_name:TableName,cond:Dic<any>){
        this.tb_name = tb_name;
        this.cond = cond;
    }
    parseDic(dicData:Dic<any>){
        return dicData
    }
    makeDic(data:any):Dic<any>{
        return data;
    }
    add(obj: any){
        return game.sqlMgr.add(this.tb_name,this.makeDic(obj));
    }
    del(){
        return game.sqlMgr.del(this.tb_name,this.cond);
    }
    select(){
        return game.sqlMgr.select(this.tb_name,this.cond);
    }
    updateInstantly(obj: any){
        let dicObj = this.makeDic(obj);
        game.sqlMgr.update(this.tb_name,dicObj,this.cond)
    }
    update(obj: any){
        let dicObj = this.makeDic(obj);
        for(let i in dicObj){
            this.whileUpdateKeyList[dicObj[i].key] = dicObj[i].value
        }
    }
    doSqlUpdate(){
        if(Object.keys(this.whileUpdateKeyList).length > 0){
            game.sqlMgr.update(this.tb_name,this.whileUpdateKeyList,this.cond)
            this.whileUpdateKeyList = {};
        }
    }
}