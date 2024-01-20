import { CompBase } from "./CompBase";

const {ccclass, property} = cc._decorator;
@ccclass
export class PanelBase extends CompBase{
    panelName:string
    closeCallBack:()=>void
    parmeter:any
    start(): void {  
    }
    playClose(callBack:()=>void){
        this.node.runAction(
            cc.sequence(
                cc.scaleTo(0.2,1),
                cc.callFunc(()=>{
                    if(this.closeCallBack){
                        this.closeCallBack();
                    }
                    if(callBack){
                        callBack();
                    }
                })
            )
        )
    }
    setOpenParmeter(parmeter:any,closeCallBack){
        this.parmeter = parmeter;
        this.closeCallBack = closeCallBack;
    }
    closePanel(){
        game.panelMgr.closePanel(this);
    }
}