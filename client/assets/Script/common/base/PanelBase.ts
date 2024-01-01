const {ccclass, property} = cc._decorator;
@ccclass
export class PanelBase extends cc.Component{
    panelName:string
    start(): void {  
    }
    playClose(callBack:()=>void){
        this.node.runAction(
            cc.sequence(
                cc.scaleTo(0.2,1),
                cc.callFunc(()=>{
                    if(callBack){
                        callBack();
                    }
                })
            )
        )
    }
    closePanel(){
        game.panelMgr.closePanel(this);
    }
}