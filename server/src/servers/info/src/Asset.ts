import { SqlBase } from "../../../common/base/SqlBase";
import { Dic } from "../../../common/interface/ICommon";
import {I_item } from "../../../common/interface/IInfo";
import { TableName } from "../../../common/manager/SqlManager";
import {Player } from "./Player";
let defaultItems:Dic<I_item> = {
    1:{
        num: 2
    },
    2:{
        num:2
    }
}
export class Asset extends SqlBase{
    compKey: { [key: string]: string[]} = {};
    defaultCompKey?: string = "items";
    private items: Dic<I_item> = {};
    private player:Player
    public whileUpdateSqlKeyMap:{[key:string]:number[]} = {};
    constructor(player: Player) {
        super(TableName.ASSET,{uid:player.uid})
        this.player = player;
    }
    async init():Promise<Dic<any>>{
        return new Promise(async (resolve,reject)=>{
            super.init(defaultItems).then((data:Dic<any>)=>{
                this.items = data;
                resolve(data);
            })
        })
    }
    getAllDataByCompKey(compKey: string): Dic<any> {
        let newDic:Dic<I_item> = {};
        if(compKey == this.defaultCompKey){
            for(let key in this.items){
                if(!isNaN(Number(key))){
                    newDic[key] = this.items[key];
                }
            }
        }else{
            let keyList = this.compKey[compKey]
            for(let key in keyList){
                newDic[key] = this.items[key];
            }
        }
        return newDic
    }
    update(){
        
    }
}