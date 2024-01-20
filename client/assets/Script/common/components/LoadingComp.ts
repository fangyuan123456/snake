// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { LOAD_ORDER_CFG } from "../../platform/PlatformBase";

const {ccclass, property} = cc._decorator;

@ccclass
export default class LoadingComp extends cc.Component {

    @property(cc.ProgressBar)
    loadingBar: cc.ProgressBar = null;

    @property(cc.Label)
    progressText: cc.Label = null;

    @property(cc.Label)
    decriLabel: cc.Label = null;

    progressCfg:LOAD_ORDER_CFG[]
    curProgress:number = 0
    totalProgress:number = 0
    start () {

    }
    setTotalProgress(){
        for(let i in this.progressCfg){
            this.totalProgress+=this.progressCfg[i].progressNum
        }
    }
    startRun(progressCfg:LOAD_ORDER_CFG[],target:cc.Component){
        let taskQue = game.taskMgr.createTaskQue("");
        this.progressCfg = progressCfg;
        this.setTotalProgress();
        for(let i in progressCfg){
            let cfg = progressCfg[i];
            let runFunc = (next)=>{
                let nextFunc = ()=>{
                    this.curProgress+=cfg.progressNum;
                    this.setProgress(this.curProgress);
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
                if(target[cfg.funcName]){
                    target[cfg.funcName](nextFunc);
                }else{
                    game.logMgr.error("funcName: %s is not find in %s",cfg.funcName,target.name)
                }
            }
            taskQue.addTask({
                taskFunc:runFunc
            })
        }
        taskQue.startRun();
    }
    runProgressFunc:(number)=>void
    runProgressByTime(cfg:LOAD_ORDER_CFG){
        let progress = this.curProgress;
        let time = 0;
        let actionFunc = (dt)=>{
            time+=dt;
            let precent = time/cfg.time
            precent = precent>1?1:precent;
            let value = precent*cfg.progressNum;
            this.setProgress(progress+value);
            if(cfg.time<time){
                this.unschedule(actionFunc);
            }
        }
        this.runProgressFunc = actionFunc;
        this.schedule(actionFunc)
    }
    stopRunProgress(){
        if(this.runProgressFunc){
            this.unschedule(this.runProgressFunc);
            this.runProgressFunc = null;
        }
    }
    setProgress(progress){
        let precent = +(progress/this.totalProgress).toFixed(2);
        this.loadingBar.progress = precent;
        if(this.progressText){
            console.log(precent)
            console.log((precent*100)+"%")
            this.progressText.string = Math.ceil(precent*100)+"%"
        }
    }
    setTitle(title:string){
        if(this.decriLabel){
            this.decriLabel.string = title;
        }
    }
    // update (dt) {}
}
