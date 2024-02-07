// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class IconRollingNode extends cc.Component {
    spHeight:number;
    minPosY:number;
    stopCallBack:()=>void;
    stopDistance:number;
    start(){
        this.spHeight = cc.find("rollingNode",this.node).children[0].getContentSize().height;
        this.minPosY = 0;
        this.startRolling();
    }
    startRolling(){
        let children = cc.find("rollingNode",this.node).children;
        for(let i in children){
            children[i].position.y = Number(i)*this.spHeight + this.minPosY;
        }
        this.schedule(this.iconRollingCallFunc,0.02)
    }
    createIcon(imgUrl:string,parent:cc.Node):cc.Node{
        let node = new cc.Node();
        node.addComponent(cc.Sprite);
        parent.addChild(node);
        game.resMgr.setPlayerIcon(node,imgUrl);
        return node;
    }
    stopRolling(imgUrl:string,callBack:()=>void){
        this.stopCallBack = callBack;
        let maxHeight = 0;
        let rollSpNode = null;
        let children = cc.find("rollingNode",this.node).children;
        for(let i = 0;i<children.length;i++){
            if(children[i].y>maxHeight){
                maxHeight = children[i].y;
                rollSpNode = children[i];
            }
        }
        this.stopDistance = maxHeight + 50;
        this.createIcon(imgUrl,rollSpNode).y = 50;
    }
    iconRollingCallFunc(){
        let children = cc.find("rollingNode",this.node).children;
        for(let  i = 0;i<children.length;i++){
            children[i].y-=20;
            if(!this.stopDistance && children[i].y<this.minPosY){
                children[i].y+=this.spHeight*children.length
            }
        }
        this.stopDistance -=20;
        if(this.stopDistance<=0){
            this.stopCallBack();
        }
    }
    // update (dt) {}
}
