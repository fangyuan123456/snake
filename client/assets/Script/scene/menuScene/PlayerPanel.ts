// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { CompBase } from "../../common/base/CompBase";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PlayerPanele extends CompBase {
    start () {
        cc.find("namePanel/name",this.node).getComponent(cc.Label).string = game.userData.nickName;
        cc.find("id",this.node).getComponent(cc.Label).string = "id"+game.userData.uid;
    }

    // update (dt) {}
}
