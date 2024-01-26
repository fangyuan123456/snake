// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { PanelBase } from "../../common/base/PanelBase";
import { I_assetInfo } from "../../common/interface/I_Info";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GetRewardPanel extends PanelBase {
    jiaBeiNum:number;
    asset:I_assetInfo
    start () {
        super.start();
        cc.find("panel/bg/guang",this.node).runAction(cc.repeatForever(cc.rotateBy(1,180)))
    }
    init(data:{jiaBeiNum:number,asset:I_assetInfo}){
        this.jiaBeiNum=data.jiaBeiNum;
        this.asset=data.asset;
        let itemParent = cc.find("panel/bg/prop",this.node);
        for(let i in this.asset.items){
            game.resMgr.createItem({item:this.asset.items[i]},itemParent)
        }
        if(this.jiaBeiNum){
            cc.find("panel/bg/btnPanel/jiaBeiBtn",this.node).active=true;
            cc.find("panel/bg/btnPanel/jiaBeiBtn/Background/label",this.node).getComponent(cc.Label).string=this.jiaBeiNum+"倍领取";
        }else{
            cc.find("panel/bg/btnPanel/jiaBeiBtn",this.node).active=false;
        }
    }
    btn_jiaBei(){
        game.aduintMgr.playVideoAd().then((isOk:boolean)=>{
            if(isOk){
                game.netMgr.sendSocket(
                    {
                        msgHead:"jiaBeiRewrold",
                        msgData:{jiaBeiNum:this.jiaBeiNum,prop:this.asset}
                    }
                )   
            }
        })
    }
}
