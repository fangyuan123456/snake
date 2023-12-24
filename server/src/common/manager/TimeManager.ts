import { SingleBase } from "../base/SingleBase";

export class TimeManager extends SingleBase{
    schedule(callBack:()=>void,time:number):NodeJS.Timeout{
       return setInterval(callBack,time*1000)
    }
    unSchedule(id:NodeJS.Timeout){
        clearInterval(id);
    }
    scheduleOnce(callBack:()=>void,time:number):NodeJS.Timeout{
        return setTimeout(callBack,time*1000)
    }
    unScheduleOnce(id:NodeJS.Timeout){
        clearInterval(id);
    }
}