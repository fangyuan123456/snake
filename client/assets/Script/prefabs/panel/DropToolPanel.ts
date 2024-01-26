// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { PanelBase } from "../../common/base/PanelBase";

const {ccclass, property} = cc._decorator;

@ccclass
export default class DropToolPanel extends PanelBase {


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    
    start () {
        super.start();
    }
    btn_playMove(){
        var that=this;
        game.aduintMgr.playVideoAd().then((isOn)=>{
            if(isOn){
                game.gameData.isDropToolOn=true;
                game.alertMgr.showAlert("辅助方块功能已开启！");
                that.closePanel();
            }
        })
    }
    // update (dt) {}
}
