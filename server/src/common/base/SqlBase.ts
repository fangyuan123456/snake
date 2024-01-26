import { Dic } from "../interface/ICommon";
import { TableName } from "../manager/SqlManager";
type resolveType = (data:any)=>void;
export class SqlBase{
    cond:Dic<any> = null!
    data?:Dic<any>
    tb_name:TableName
    whileUpdateKeyList:Dic<any> = {}
    getInfoResolveCallList:resolveType[] = [];
    defaultItems?:Dic<any>
    constructor(tb_name:TableName,cond:Dic<any>){
        this.tb_name = tb_name;
        this.cond = cond;
        this.init();
    }
    init(){
        if(this.data){
            return new Promise((resolve,reject)=>{
                resolve(this.data);
                this.callGetInfoResolve();
            })
        }else{
            return new Promise(async (resolve:(data:Dic<any>)=>void,reject)=>{
                let data = await this.select();
                if(!data){
                    let defaultData = this.defaultItems || {};
                    data = defaultData;
                    this.add(defaultData);
                }
                this.data = data;
                resolve(this.data);
                this.callGetInfoResolve();
            })
        }
    }
    callGetInfoResolve(){
        let data = this.data;
        if(data){
            for(let i in this.getInfoResolveCallList){
                let callBack = this.getInfoResolveCallList[i];
                if(callBack){
                    callBack(this.data);
                }
            }
            this.getInfoResolveCallList=[];
        }
    }
    getInfo(){
        return new Promise((resolve,reject)=>{
            this.getInfoResolveCallList.push(resolve);
            this.callGetInfoResolve();
        })
    }
    getCond(){
        return this.cond
    }
    fullCompKeyData(obj:Dic<any>,compKey:string){
        return this.data![compKey];
    }
    parseTableKeyDic(dicObj:Dic<any>){
        let cond = this.getCond();
        let newDicObj:Dic<any> = {};
        for(let key in dicObj){
            if(!cond[key]){
                if(typeof dicObj[key] == "string"){
                    try{
                        newDicObj[key] = JSON.parse(dicObj[key]);
                    }catch(err){
                        newDicObj[key] = dicObj[key];
                    }
                }else{
                    newDicObj[key] = dicObj[key];
                }
            }
        }
        return newDicObj;
    }
    makeTableKeyDic(dicObj:Dic<any>){
        let newDicObj:Dic<any> = {};
        for(let key in dicObj){
            newDicObj[key] = dicObj[key];
            if(typeof newDicObj[key] == "object"){
                newDicObj[key] = JSON.stringify(newDicObj[key]);
            } 
        }
        return newDicObj;
    }
    add(obj: any){
        let dicObj = this.makeTableKeyDic(obj);
        let cond = this.getCond();
        for(let i in cond){
            dicObj[i] = cond[i];
        }
        return game.sqlMgr.add(this.tb_name,dicObj);
    }
    del(){
        return game.sqlMgr.del(this.tb_name,this.getCond());
    }
    async select(){
        let data = await game.sqlMgr.select(this.tb_name,this.getCond());
        if(data.length>0){
            let dicData:Dic<any> = data[0];
            return this.parseTableKeyDic(dicData);
        }else{
            return null;
        }
    }
    updateInstantly(obj: any,compKey?:string){
        if(compKey){
            obj = this.fullCompKeyData(obj,compKey);
        }
        let dicObj = this.makeTableKeyDic(obj);
        game.sqlMgr.update(this.tb_name,dicObj,this.getCond())
    }
    update(obj: Dic<any>,compKey?:string){
        if(compKey){
            obj = this.fullCompKeyData(obj,compKey);
        }
        let dicObj = this.makeTableKeyDic(obj);
        for(let i in dicObj){
            this.whileUpdateKeyList[i] = dicObj[i]
        }
    }
    doSqlUpdate(){
        if(Object.keys(this.whileUpdateKeyList).length > 0){
            game.sqlMgr.update(this.tb_name,this.whileUpdateKeyList,this.getCond())
            this.whileUpdateKeyList = {};
        }
    }
}