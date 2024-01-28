// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { CompBase } from "../common/base/CompBase";
import { I_item } from "../common/interface/I_Info";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Item extends CompBase {
    itemData: { item: I_item; scale?: number; } = null;
    itemCfgs: any;
    start () {
        super.start();
        game.configMgr.getCfg("items",(data:any)=>{
            this.itemCfgs = data;
            this.updateItemShow();
        },this)
    }
    setItemData(data:{item:I_item,scale?:number}){
        console.log(data);
        this.itemData = data;
        this.node.scale = data.scale || 1;
        this.updateItemShow();
    }
    updateItemShow(){
        if(this.itemCfgs&& this.itemData){
            let cfg = this.itemCfgs[this.itemData.item.id];
            cc.find("num",this.node).getComponent(cc.Label).string = this.itemData.item.num+"";
            cc.find("name",this.node).getComponent(cc.Label).string = cfg.name+"";
            game.resMgr.setSpImg(cc.find("icon",this.node),"pic/items/item"+this.itemData.item.id)
        }
    }
}
