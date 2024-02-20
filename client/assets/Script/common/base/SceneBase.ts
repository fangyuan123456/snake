import { CompBase } from "./CompBase";

const {ccclass, property} = cc._decorator;
export enum FIT_STYLE{
    FIT_WIDTH,
    FIT_HEIGHT
}
export enum SCENE_NAME{
    LOADSCENE = "LoadScene",
    MENUSCENE = "MenuScene",
    GAMESCENE = "GameScene"
}
@ccclass
export class SceneBase extends CompBase{
    fitStyle:FIT_STYLE
    sceneName:SCENE_NAME;
    constructor(sceneName:SCENE_NAME){
        super();
        this.sceneName = sceneName;
    }
    start(): void {
        this.fitWinSize();
        game.sceneMgr.setCurrentScene(this);
        this.createGuangBoNode();    
    }
    createGuangBoNode(){
        let guangBoPosNode = cc.find("guangBoPosNode",this.node);
        let guanBo = cc.find("GuangBoNode",game.getPersistNode());
        if(guangBoPosNode){
            if(!guanBo){
                game.resMgr.loadRes<cc.Prefab>("prefabs/GuangBoNode",cc.Prefab).then((prefab:cc.Prefab)=>{
                    guanBo = cc.instantiate(prefab);
                    game.getPersistNode().addChild(guanBo);
                    let pos = game.utilsMgr.getNodeInTargetPos(guangBoPosNode,guanBo.parent);
                    guanBo.setPosition(pos);
                })
            }
        }else{
           if(guanBo){
             guanBo.destroy();
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