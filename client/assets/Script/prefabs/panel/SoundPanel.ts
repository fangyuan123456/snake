// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { PanelBase } from "../../common/base/PanelBase";
import { e_RoomType } from "../../common/interface/I_Game";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SettingPanel extends PanelBase {
    start () {
        super.start();

        if(game.soundsMgr.musicSwitchMap.musicSwitch){
            cc.find("panel/bg/music",this.node).getComponent(cc.Toggle).isChecked=true;
        }else{
            cc.find("panel/bg/music",this.node).getComponent(cc.Toggle).isChecked=false;
        }
        if(game.soundsMgr.musicSwitchMap.effectSwitch){
            cc.find("panel/bg/effect",this.node).getComponent(cc.Toggle).isChecked=true;
        }else{
            cc.find("panel/bg/effect",this.node).getComponent(cc.Toggle).isChecked=false;
        }
        if(game.roomData && game.roomData.roomType==e_RoomType.GAME_FIGHT){
            game.roomData.isGamePause=true;
        }
    }
    btn_check(event,_num){
        var _isCheck=event.node.getComponent(cc.Toggle).isChecked;
        game.soundsMgr.switchMusic(_num,_isCheck);
    }
}
