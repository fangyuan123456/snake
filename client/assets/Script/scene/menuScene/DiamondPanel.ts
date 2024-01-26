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
export default class DiamondPanel extends CompBase {
    start () {
        super.start();
        game.userData.getAssetInfo(this).then((asset:I_assetInfo)=>{
            this.updateDiamond(asset.diamond);
        })
       
    }
    updateDiamond(num){
        cc.find("diamondNum",this.node).getComponent(cc.Label).string = num;
    }
}
