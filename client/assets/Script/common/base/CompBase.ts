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
    isvalid(){
        return this.node && this.node.parent
    }
}