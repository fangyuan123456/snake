// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:

import { SocketType } from "../common/Game";

//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html
const {ccclass, property} = cc._decorator;

@ccclass
export default class MenuScene extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        game.netMgr.createSocket(game.userData.centerIp)
        game.netMgr.onReady((data)=>{
            game.netMgr.sendSocket({
                msgHead:"test",
                msgData:{test1:"111"}
            },(data)=>{
                console.log(data);
            })
        },this);
        game.panelMgr.openPanel("testPanel").then((panel)=>{
         });
        game.logMgr.debug("hahah");
    }

    // update (dt) {}
}
