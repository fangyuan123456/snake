import { SingleBase } from "../base/SingleBase";

export class TimeManager extends SingleBase{
    scheduleOnce(callBack:()=>void,delayTime:number,target:cc.Node = game.getPersistNode()){
        let scheduler = cc.director.getScheduler();
        let callFunc = ()=>{
            this.unSchedule(callFunc,target);
            if(callBack){
                callBack();
            }
        }
        scheduler.schedule(callFunc,target,delayTime)
    }
    unSchedule(callBack:(dt:number)=>void,target?:cc.Node){
        let scheduler = cc.director.getScheduler();
        scheduler.unschedule(callBack,target)
    }
    schedule(callBack:(dt:number)=>void,delayTime:number = 0,target:cc.Node = game.getPersistNode()){
        let scheduler = cc.director.getScheduler();
        scheduler.schedule((dt)=>{
            if(callBack){
                callBack(dt);
            }
        },target,delayTime)
    }
}