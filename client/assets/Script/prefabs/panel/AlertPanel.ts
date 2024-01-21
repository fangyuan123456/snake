// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { PanelBase } from "../../common/base/PanelBase";

const {ccclass, property} = cc._decorator;

@ccclass
export default class AlertPanel extends PanelBase {
    start () {
        super.start();
    }
    fitSize(){}
    playOpenAction(): void {
        this.node.runAction(cc.sequence(
            cc.moveBy(0.2,cc.v2(0,50)),
            cc.delayTime(1),
            cc.fadeOut(0.2),
            cc.callFunc(()=>{
                this.closePanel();
            })
        ))
    }
    playCloseAction(callBack: () => void): void {
        super.playCloseAction(callBack);
    }
    init(parmeter:any,closeCallBack){
        super.init(parmeter,closeCallBack);
        cc.find("tishiLabel",this.node).getComponent(cc.Label).string = parmeter;
    }
}
