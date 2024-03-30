import { SingleBase } from "../base/SingleBase";
interface I_BindingStruct {
    curData: { target: any, key: string },
    targetData: { target: any, key: string }
}
export class DataBindManager extends SingleBase {
    isStartRun: boolean = false
    bindList: { bindData: I_BindingStruct, callBack: (data: any) => void }[] = []
    constructor() {
        super();

    }
    bind(bindData: I_BindingStruct, callBack?: () => void) {
        this.bindList.push({ bindData: bindData, callBack: callBack })
        this.update();
        if (!this.isStartRun) {
            this.isStartRun = true;
            game.timeMgr.schedule(this.update, 0.1);
        }
    }
    update() {
        for (let i = this.bindList.length - 1; i >= 0; i--) {
            let targetData = this.bindList[i].bindData.targetData;
            let curData = this.bindList[i].bindData.curData;
            if(targetData.target.isValid && curData.target.isValid){
                if (targetData.target[targetData.key] != curData.target[curData.key]) {
                    curData.target[curData.key] = targetData.target[targetData.key];
                    if (this.bindList[i].callBack) {
                        this.bindList[i].callBack(targetData.target[targetData.key]);
                    }
                }
            }else{
                this.bindList.splice(i,1);
            }
        }
    }
}