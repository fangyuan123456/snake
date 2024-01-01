import { LOAD_ORDER_CFG } from "../../platform/PlatformBase";
import { SingleBase } from "../base/SingleBase";

interface Task {
    data?:any
    taskFunc?:(next:()=>void,data:any)=>void,
}

export class Queque{
    queCompeleCallBack:(queName)=>void
    queName:string = ""
    tasks:Task[] = []
    curRunTask:Task = null
    isStarRuning = false;
    constructor(queName:string,queCompeleCallBack:(queName)=>void){
        this.queName = queName;
        this.queCompeleCallBack = queCompeleCallBack;
    }
    getCurRunTask():Task{
        return this.curRunTask
    }
    startRun(){
        this.isStarRuning = true;
        let task = this.tasks.shift();
        if(!task){
            this.queCompeleCallBack(this.queName);
        }else{
            this.curRunTask = task;
            if(task.taskFunc){
                task.taskFunc(this.startRun.bind(this),task.data);
            }
        }
    }
    addTask(task: Task) {
        this.tasks.push(task);
        if(this.isStarRuning && !this.getCurRunTask()){
            this.startRun();
        }
    }
}
export class TaskManager extends SingleBase{
    private taskQues: { [queName: string]: Queque } = {};
  
    constructor() {
        super();
        this.taskQues = {};
    }
    createTaskQue(queName: string) {
        if(this.taskQues[queName]){
            game.logMgr.error("queName is create in QueueList");
            return;
        }
        this.taskQues[queName] = new Queque(queName,this.onTaskQueCompleted.bind(this));
        return this.taskQues[queName];
    }
    getTaskQue(queName: string) {
        if(!this.taskQues[queName]){
            game.logMgr.error("queName is not find in QueueList");
            return;
        }
        return this.taskQues[queName];
    }
    onTaskQueCompleted(queName){
    }
  }