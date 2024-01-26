// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { PanelBase } from "../../common/base/PanelBase";

const {ccclass, property} = cc._decorator;

@ccclass
export default class FuHuoPanel extends PanelBase {



    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    
    start () {
        super.start();
        this.runTimer();

    }
    private runTimer(){
        var time=10;
        var callback=()=>{
            cc.find("panel/bg/clockBg/time",this.node).getComponent(cc.Label).string=time+"";
            time--;
            if(time==0){
                this.unschedule(callback);
                this.closePanel();
            }
        }
        this.schedule(callback,1);
        callback();
    }
    btn_fuHuo(){
        game.aduintMgr.playVideoAd().then((isOk)=>{
            if(isOk){
                this.closePanel(true);
            }
        });
    }
    // update (dt) {}
}
