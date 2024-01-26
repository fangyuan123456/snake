// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { CompBase } from "../common/base/CompBase";
import { PanelBase } from "../common/base/PanelBase";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GuangBo extends CompBase {
    isBoarding:boolean = false;
    start () {
        super.start();
        cc.game.addPersistRootNode(this.node)
        this.updateActive();
        this.onEvent("openPanelChange",()=>{
            this.updateActive();;
        })
    }
    private checkIsHavePanel(){
        let ignorePanelNameList = [];
        let panelArr = cc.find("Canvas/pubUpPanel").children;
        for(let i in panelArr){
            let panelNode = panelArr[i];
            let comp = panelNode.getComponent(PanelBase);
            if(ignorePanelNameList.indexOf(comp.name)<0){
                return true;
            }
        }
    }
    updateActive(){
        this.node.active = this.isBoarding||!this.checkIsHavePanel()
    }
}
