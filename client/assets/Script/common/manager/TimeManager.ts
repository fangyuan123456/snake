import { SingleBase } from "../base/SingleBase";

export class TimeManager extends SingleBase{
    scheduleOnce(callBack:()=>void,delayTime:number,target?:Node){
        let scheduler = cc.director.getScheduler();
        scheduler.schedule(()=>{
            this.unSchedule(callBack,target);
            if(callBack){
                callBack();
            }
        },target,delayTime)
    }
    unSchedule(callBack:()=>void,target?:Node){
        let scheduler = cc.director.getScheduler();
        scheduler.unschedule(callBack,target)
    }
    schedule(callBack:(dt:number)=>void,delayTime:number,target?:Node){
        let scheduler = cc.director.getScheduler();
        scheduler.schedule((dt)=>{
            if(callBack){
                callBack(dt);
            }
        },target,delayTime)
    }
}