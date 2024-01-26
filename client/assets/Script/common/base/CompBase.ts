const {ccclass, property} = cc._decorator;
@ccclass
export class CompBase extends cc.Component{
    start(): void {  
    }
    onEvent(eventName:string,callBack:()=>void){
        game.eventMgr.on(eventName,callBack,this)
    }
    onceEvent(eventName:string,callBack:()=>void){
        game.eventMgr.once(eventName,callBack,this)
    }
    protected onDestroy(): void {
        game.eventMgr.removeAll(this);
    }
}