import { I_LoadCfg } from "../interface/I_Common"

export class LoadingTask{
    progressCfg:I_LoadCfg[]
    progressCallBack:(precent:number,title?:string)=>void
    taskName:string
    private target:any
    private targetList:any[]
    private curProgress:number = 0
    private totalProgress:number = 0
    private precent:number = 0
    private title:string = ""

    constructor(){}
    start (progressCfg,target:any|any[],progressCallBack?:(precent:number,title?:string)=>void) {
        this.taskName = "LoadingTask"+new Date().getTime();
        this.progressCfg = progressCfg;
        this.progressCallBack = progressCallBack
        if(Array.isArray(target)){
            this.targetList = target;
        }else{
            this.target = target;
        }
        return new Promise<void>((resolve, reject) => {
            this.startRun();
            game.taskMgr.setDelegate(this.taskName,()=>{
                resolve();
            })
        })

    }
    setTotalProgress(){
        for(let i in this.progressCfg){
            this.totalProgress+=this.progressCfg[i].progressNum
        }
    }
    startRun(){
        let taskQue = game.taskMgr.createTaskQue(this.taskName);
        this.progressCfg = this.progressCfg;
        this.setTotalProgress();
        for(let i in this.progressCfg){
            let cfg = this.progressCfg[i];
            let runFunc = (next)=>{
                let progress = this.curProgress;
                let nextFunc = ()=>{
                    this.setProgress(progress + cfg.progressNum);
                    this.curProgress = progress + cfg.progressNum;
                    if(cfg.time){
                        this.stopRunProgress();
                    }
                    next();
                }
                if(cfg.time){
                    this.runProgressByTime(cfg);
                }
                if(cfg.title){
                    this.setTitle(cfg.title);
                }
                if(this.target){
                    if(this.target[cfg.funcName]){
                        this.target[cfg.funcName](nextFunc);
                        return;
                    }
                }else{
                    for(let i = 0;i<this.targetList.length;i++){
                        let target = this.targetList[i];
                        if(target[cfg.funcName]){
                            target[cfg.funcName](nextFunc);
                            return;
                        }
                    }
                }
                game.logMgr.error("funcName: %s is not find in %s",cfg.funcName,this.taskName)
            }
            taskQue.addTask({
                taskFunc:runFunc
            })
        }
        taskQue.startRun();
    }
    runProgressFunc:(number)=>void
    runProgressByTime(cfg:I_LoadCfg){
        let progress = this.curProgress;
        let time = 0;
        let actionFunc = (dt)=>{
            time+=dt;
            let precent = time/cfg.time
            precent = precent>1?1:precent;
            let value = precent*cfg.progressNum;
            this.setProgress(progress+value);
            if(cfg.time<time){
                game.timeMgr.unSchedule(actionFunc);
            }
        }
        this.runProgressFunc = actionFunc;
        game.timeMgr.schedule(actionFunc);
    }
    stopRunProgress(){
        if(this.runProgressFunc){
            game.timeMgr.unSchedule(this.runProgressFunc);
            this.runProgressFunc = null;
        }
    }
    setProgress(progress){
        let precent = +(progress/this.totalProgress).toFixed(2);
        this.precent = precent;
        if(this.progressCallBack){
            this.progressCallBack(this.precent,this.title)
        }
    }
    setTitle(title:string){
        this.title = title;
    }
}