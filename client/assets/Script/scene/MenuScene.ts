// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:

import { SceneBase } from "../common/base/SceneBase";





//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html
const {ccclass, property} = cc._decorator;

@ccclass
export default class MenuScene extends SceneBase {
    start () {
        super.start();
    }
    btn_setting(){
        game.panelMgr.openPanel("SoundPanel");
    }
    btn_rank(){
        game.panelMgr.openPanel("RankingPanel");
    }
    btn_piFu(){
        game.panelMgr.openPanel("PiFuPanel");
    }
    btn_shop(){
        game.panelMgr.openPanel("ShopPanel");
    }
    btn_sign(){
        game.panelMgr.openPanel("SignPanel");
    }
    btn_invite(){
        game.panelMgr.openPanel("InviteReworldPanel");
    }
    btn_tool(){
        game.panelMgr.openPanel("DropToolPanel");
    }
    btn_match(){
        game.panelMgr.openPanel("MatchPanel");
    }
}
