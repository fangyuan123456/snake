import { SceneBase } from "../base/SceneBase";
import { SingleBase } from "../base/SingleBase";
import { Dic } from "../interface/I_Common";

export class StorgeManager extends SingleBase{
    getItems(itemKeyList:string[]){
        let itemData:Dic<any> = {};
        for(let i in itemKeyList){
            itemData[itemKeyList[i]] = this.getItem(itemKeyList[i]);
        }
        return itemData;
    }
    getItem(itemKey:string){
        let dataStr = localStorage.getItem(itemKey);
        let data = null;
        try{
            data = JSON.parse(dataStr)
        }catch(e){
            data = dataStr;
        }
        return data;
    }
    setItems(itemData:Dic<any>){
        for(let i in itemData){
            this.setItem(i,itemData[i]);
        }
    }
    setItem(itemKey:string,data:any){
        if(data){
            let putData = "";
            if(typeof(data) == "boolean" || typeof(data) == "number"){
                putData = data + "";
            }else if(typeof(data) == "object"){
                putData = JSON.stringify(data);
            }
            localStorage.setItem(itemKey,data)
        }else{
            localStorage.removeItem(itemKey);
        }
    }
}