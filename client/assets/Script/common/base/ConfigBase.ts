import TableBase from "./TableBase";
import { Dic, e_bundleName } from "../interface/I_Common";
export class ConfigBase{
    bundleName:e_bundleName = null
    tables:Dic<TableBase> = {};
    dataCfgs:Dic<any> = {};
    constructor(bundleName?:e_bundleName){
        this.bundleName = bundleName;
    }
    getCfg(tbName:string,callBack:(data:any)=>void,target?:any){
        if(!this.tables[tbName]){
            this.tables[tbName] = new TableBase(tbName,this.bundleName,this);
        }
        return this.tables[tbName].getData(callBack,target);
    }
    getLayer(key:string,value:number,tbName:string = "userLayer"){
        let layerData = this.tables[tbName].getDataSync();
        let dataValue = 0;
        let layer = layerData[key].layer;
        let layerList = []
        for(let i in layer){
            layerList.push({key:i,value:layer[i]})
        }
        layerList.sort((a,b)=>{
            return b.key - a.key;
        })
        for(let i = 0;i<layerList.length;i++){
            if(value>=layerList[i].key){
                dataValue = layerList[i].value;
                break;
            }
        }
        return dataValue;
    }
    destory(){
        for(let i in this.tables){
            this.tables[i].destroy();
        }
    }
}