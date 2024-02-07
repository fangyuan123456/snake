import { CompBase } from "../base/CompBase";
import { SingleBase } from "../base/SingleBase";
interface EVENT_LIST{
    target:CompBase,
    callBack:(data?:any)=>void,
    isOnce?:boolean
}
export class EventManager extends SingleBase{
    eventMap:{[eventName: string]:EVENT_LIST[]} = {}
    on(eventName:string,callBack:(data?:any)=>void,target?:CompBase) {
        if(!this.getEventData(eventName,callBack)){
            this.eventMap[eventName] = this.eventMap[eventName] || [];
            this.eventMap[eventName].push({
                target:target,
                callBack:callBack
            })
        }
    }
    once(eventName:string,callBack:(data?:any)=>void,target?:CompBase) {
        if(!this.getEventData(eventName,callBack)){
            this.eventMap[eventName] = this.eventMap[eventName] || [];
            this.eventMap[eventName].push({
                target:target,
                callBack:callBack,
                isOnce:true
            })
        }
    }
    dispatch(eventName,data?:any){
        let eventList = this.eventMap[eventName] || [];
        for(let i = 0;i<eventList.length;i++){
            if(eventList[i].target && (!eventList[i].target.node || !eventList[i].target.node.parent)){
                eventList.splice(i);
                i--
            }else{
                eventList[i].callBack(data);
            }
        }
        for(let i = eventList.length-1;i>=0;i--){
            if(eventList[i].isOnce){
                eventList.splice(i);
            }
        }
    }
    remove(eventName:string,callBack:(data?:any)=>void){
        let eventData = this.getEventData(eventName,callBack);
        if(eventData){
            let index = this.eventMap[eventName].indexOf(eventData);
            this.eventMap[eventName].splice(index);
        }
    }
    removeAll(target:CompBase){
        for(let i in this.eventMap){
            for(let j = this.eventMap[i].length - 1;j>=0;j--){
                let eventData = this.eventMap[i][j];
                if(eventData.target == target){
                    this.eventMap[i].splice(j);
                }
            }
        }
    }
    private getEventData(eventName,callBack:(data?:any)=>void){
        this.eventMap[eventName] = this.eventMap[eventName] || []
        for(let i in this.eventMap[eventName]){
            let eventData = this.eventMap[eventName][i];
            if(eventData.callBack == callBack){
                return eventData;
            }
        }
    }
}