// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class FitBgComp extends cc.Component {
    start () {
        var winSize=cc.view.getFrameSize()
        var scaleX=this.node.width/winSize.width;
        var scaleY=this.node.height/winSize.height;
        this.node.scale=scaleX>scaleY?scaleX/scaleY:scaleY/scaleX;
    }
}
