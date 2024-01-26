import FitBgComp from "../components/FitBgComp";
import { CompBase } from "./CompBase";

const {ccclass, property} = cc._decorator;
@ccclass
export class PanelBase extends CompBase{
    panelName:string
    closeCallBack:(any)=>void
    parmeter:any
    start(): void { 
        this.playOpenAction(); 
    }
    init(parmeter:any,closeCallBack){
        this.parmeter = parmeter;
        this.closeCallBack = closeCallBack;
        this.fitSize();
        this.setPanelSwallowTouch(true);
    }
    onOpen(){

    }
    fitSize(){
        this.node.setContentSize(this.node.parent.getContentSize())
        let bg = cc.find("bg",this.node);
        if(bg){
            bg.addComponent(FitBgComp);
        }
    }
    setPanelSwallowTouch(_b){
        let button = this.node.getComponent(cc.Button)
        if(!button){
            button = this.node.addComponent(cc.Button);
        }
        button.interactable = _b;
    }
    playOpenAction(){
        let bg = cc.find("bg",this.node);
        let panel = cc.find("panel",this.node);
        if(bg){
            let opacity = bg.opacity;
            bg.opacity = 0;
            bg.runAction(cc.fadeTo(0.15,opacity))
        }
        if(panel){
            panel.scale = 0;
            panel.runAction(
                cc.sequence(
                    cc.scaleTo(0.2,1),
                    cc.callFunc(()=>{
                        this.onOpen();
                    })
                )
            )
        }else{
            this.onOpen();
        }
    }
    playCloseAction(callBack:()=>void){
        let bg = cc.find("bg",this.node);
        let panel = cc.find("panel",this.node);
        if(bg){
            bg.runAction(cc.fadeTo(0.15,0))
        }
        if(panel){
            panel.runAction(
                cc.sequence(
                    cc.scaleTo(0.15,0),
                    cc.callFunc(()=>{
                        if(callBack)callBack();
                    })
                )
            )
        }else{
            if(callBack)callBack();
        }
    }
    closeParmter?:any
    closePanel(closeParmter?:any){
        this.closeParmter = closeParmter
        game.panelMgr.closePanel(this);
    }
    protected onDestroy(): void {
        super.onDestroy();
        if(this.closeCallBack){
            this.closeCallBack(this.closeParmter);
        }
    }
}