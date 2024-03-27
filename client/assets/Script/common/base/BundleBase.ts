import { LoadingTask } from "../customClass/LoadingTask";
import { I_LoadCfg } from "../interface/I_Common";
import { CompBase } from "./CompBase";
export class BundleBase extends CompBase{
    bundle:cc.AssetManager.Bundle = null
    downLoadCfg:I_LoadCfg[] = [];
    constructor(){
        super();
    }
    preLoad(progressCallBack:(precent:number,title?:string)=>void){
        return new Promise<void>((resolve, reject) => {
            let downLoader = new LoadingTask();
            downLoader.start(this.downLoadCfg,this,progressCallBack).then(()=>{
                resolve();
            });
        })
    }
}