import { CompBase } from "./CompBase";

const {ccclass, property} = cc._decorator;
export enum FIT_STYLE{
    FIT_WIDTH,
    FIT_HEIGHT
}
@ccclass
export class SceneBase extends CompBase{
    fitStyle:FIT_STYLE
    start(): void {
        this.fitWinSize();
        game.sceneMgr.setCurrentScene(this);
        this.createGuangBoNode();    
    }
    createGuangBoNode(){
        let guangboNode = cc.find("guangBoNode",this.node);
        if(guangboNode){
            let node = cc.find("GuangBo");
            if(!node){
                game.resMgr.loadRes<cc.Prefab>("prefabs/GuangBo").then((prefab:cc.Prefab)=>{
                    node = cc.instantiate(prefab);
                    cc.director.getScene().addChild(node);
                    let pos = game.utilsMgr.getNodeInTargetPos(guangboNode,node.parent);
                    node.setPosition(pos);
                })
            }
        }else{
           let node = cc.find("GuangBo");
           if(node){
             node.destroy();
           }
        }   
    }
    fitWinSize(){
        var frameWinSize=cc.view.getFrameSize();
        var designWinSize=cc.view.getDesignResolutionSize();
        var designScale=designWinSize.width/designWinSize.height;
   
        var frameScale=frameWinSize.width/frameWinSize.height;
        if(frameScale>=designScale){
            this.fitStyle=FIT_STYLE.FIT_WIDTH;
            this.node.getComponent(cc.Canvas).fitHeight=true;
            this.node.getComponent(cc.Canvas).fitWidth=false;
        }else{
            this.fitStyle=FIT_STYLE.FIT_HEIGHT;
            this.node.getComponent(cc.Canvas).fitHeight=false;
            this.node.getComponent(cc.Canvas).fitWidth=true;
        }
    }
}