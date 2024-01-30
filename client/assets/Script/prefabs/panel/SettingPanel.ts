// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { PanelBase } from "../../common/base/PanelBase";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SettingPanel extends PanelBase {
    start () {
        super.start();
    }
    btn_sound(){
        this.closePanel();
        game.panelMgr.openPanel("SoundPanel");
    }
    btn_exit(){
        this.closePanel();
        game.sceneMgr.changeScene("MenuScene",true);
    }
    btn_resume(){
        this.closePanel();
    }
}
