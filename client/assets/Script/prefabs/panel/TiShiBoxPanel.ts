// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { PanelBase } from "../../common/base/PanelBase";

const {ccclass, property} = cc._decorator;
const defaultTitle = "温馨提示!";
const defaultBtnText = {
    [1] : ["确定"],
    [2] : ["确定","取消"]
}
@ccclass
export default class TiShiBoxPanel extends PanelBase {
    start () {
        super.start();
    }
    init(parmeter: any, closeCallBack: any): void {
        super.init(parmeter,closeCallBack);
        let content = cc.find("panel/content",this.node);
        let title = cc.find("panel/title",this.node);
        let btnArr = cc.find("panel/btnPanel",this.node).children;
        title.getComponent(cc.Label).string = parmeter.title || defaultTitle
        content.getComponent(cc.Label).string = parmeter.content;
        for(let i in parmeter.btnCallBackList){
            let callData = parmeter.btnCallBackList[i];
            let btn = btnArr[i];
            if(!btn){
                btn = cc.instantiate(btnArr[0]);
                cc.find("panel/btnPanel",this.node).addChild(btn);
            }
            cc.find("text",btn).getComponent(cc.Label).string = callData.text || defaultBtnText[parmeter.btnCallBackList.length][i];
            btn.on(cc.Node.EventType.TOUCH_END, ()=>{
                this.closePanel();
                if(callData.callBack){
                    callData.callBack();
                }
            }, this);
        }
    }
}
