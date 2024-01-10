import { Dic } from "../interface/ICommon";
import { TableName } from "../manager/SqlManager";
export class SqlBase{
    compKey:{[key:string]:string[]} = {}
    defaultCompKey? = null!
    cond:Dic<any> = null!
    datasCenter?:Dic<any>
    tb_name:TableName
    whileUpdateKeyList:Dic<any> = {}
    constructor(tb_name:TableName,cond:Dic<any>){
        this.tb_name = tb_name;
        this.cond = cond;
    }
    init(defaultData?:Dic<any>){
        return new Promise(async (resolve:(data:Dic<any>)=>void,reject)=>{
            let items = await this.select();
            if(!items){
                defaultData = defaultData || {};
                items = defaultData;
                this.add(defaultData);
            }
            this.sendDatasCenter(items);
            resolve(items);
        })
    }
    sendDatasCenter(datasCenter:Dic<any>){
        this.datasCenter = datasCenter;
    }
    getCond(){
        return this.cond;
    }
    isCompKey(sqlKey:string){
        if(this.compKey[sqlKey] || sqlKey == this.defaultCompKey){
            return true;
        }
        return false;
    }
    getCompKey(key:string){
        if(!isNaN(Number(key))){
            return this.defaultCompKey;
        }
        for(let sqlKey in this.compKey){
            let keyList = this.compKey[key];
            if(keyList.indexOf(key)>=0){
                return sqlKey
            }
        }
        return key;
    }
    getAllDataByCompKey(compKey:string){
        let newDic:Dic<any> = {};
        if(compKey == this.defaultCompKey){
            for(let key in this.datasCenter){
                if(!isNaN(Number(key))){
                    newDic[key] = this.datasCenter[key];
                }
            }
        }else{
            let keyList = this.compKey[compKey];
            for(let key in keyList){
                newDic[key] = this.datasCenter![key];
            }
        }
        return newDic
    }
    fullCompKeyData(obj:Dic<any>){
        let fullCompKeyList:string[] = [];
        let newDicObj:Dic<any> = {};
        for(let i in obj){
            let compKey = this.getCompKey(i);
            if(compKey){
                if(fullCompKeyList.indexOf(compKey)<0){
                    fullCompKeyList.push(compKey);
                    game.utilsMgr.merge(newDicObj,this.getAllDataByCompKey(compKey));
                }
            }else{
                newDicObj[i] = obj[i];
            }
        }
        return newDicObj;
    }
    parseTableKeyDic(dicObj:Dic<any>){
        let newDicObj:Dic<any> = {};
        for(let key in dicObj){
            if(this.isCompKey(key)){
                let compDicObj = JSON.parse(dicObj[key]);
                for(let newKey in compDicObj){
                    newDicObj[newKey] = compDicObj[newKey];
                }
            }else{
                if(typeof dicObj[key] == "string"){
                    newDicObj[key] = JSON.parse(dicObj[key]);
                }else{
                    newDicObj[key] = dicObj[key];
                }
            }
        }
        return newDicObj;
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