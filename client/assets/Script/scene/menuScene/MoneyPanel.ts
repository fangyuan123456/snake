// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { CompBase } from "../../common/base/CompBase";
import { I_assetInfo } from "../../common/interface/I_Info";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MoneyPanel extends CompBase {
    start () {
        super.start();
        game.userData.getAssetInfo((asset:I_assetInfo)=>{
            this.updateMoney(asset.money);
        },this)
       
    }
    updateMoney(num){
        cc.find("moneyNum",this.node).getComponent(cc.Label).string = num;
    }
}
