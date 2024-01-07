import { SqlBase } from "../../../common/base/SqlBase";
import { Dic } from "../../../common/interface/ICommon";
import {I_item } from "../../../common/interface/IInfo";
import { TableName } from "../../../common/manager/SqlManager";
import {Player } from "./Player";
let defaultItems:Dic<I_item> = {
    1:{
        id: 1,
        num: 2,
    }
}
export class Bag extends SqlBase{
    private items: Dic<I_item> = {};
    private player:Player
    public whileUpdateSqlKeyMap:{[key:string]:number[]} = {};
    constructor(player: Player) {
        super(TableName.BAG,{uid:player.uid})
        this.player = player;
    }
    init(){
        return new Promise(async (resolve,reject)=>{
            let bagData = await this.select();
            if(!bagData){
                bagData = defaultItems;
                this.add(defaultItems);
                this.items = defaultItems;
            }else{
                this.items = this.parseDic(bagData)
            }
            resolve(this.items);
        })
    }
    parseDic(dicData:Dic<any>){
        let newItem: Dic<I_item> = {}
        for(let i in dicData){
            let str:string = dicData[i];
            let strArr = str.split("#");
            let id = Number(strArr[0]);
            let num = Number(strArr[1]);
            let level = null;
            if(strArr[2]){
                level = Number(strArr[2]);
            }
            
            let countEndTime = null;
            if(strArr[3]){
                countEndTime = Number(strArr[3])
            }
            newItem[id] = {
                id : id,
                num:num,
                level:level!,
                countEndTime:countEndTime!
            }
        }
        return newItem
    }
    makeDic(data:Dic<I_item>):Dic<any>{
        let newDic:Dic<string> = {};
        for(let i in data){
            newDic[i] =data[i].id+"#"+data.value;
            if(data[i].level){
                newDic[i]+="#"+data[i].level
            }
            if(data[i].countEndTime){
                newDic[i]+="#"+data[i].countEndTime
            }
        }
        return newDic;
    }
    update(){
        
    }
}