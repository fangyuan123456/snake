import { AndroidPlatFormManager } from "../platform/android/AndroidPlatFormManager";
import { WebPlatfromManager } from "../platform/web/WebPlatfromManager";
import { PLATFORM_TYPE, PlatformBase, getPlatForm } from "../platform/PlatformBase";
import { SingleBase } from "./base/SingleBase";
import { LogManager } from "./manager/LogManager";
import { PanelManager } from "./manager/PanelManager";
import { ResManager } from "./manager/ResManager";
import { SceneManager } from "./manager/SceneManager";
import { TaskManager } from "./manager/TaskManager";
import { TimeManager } from "./manager/TimeManager";

declare global {
    namespace globalThis {
        var game:Global /* 的类型 */
    }
}
export class Global extends SingleBase{
    resMgr:ResManager
    panelMgr:PanelManager
    sceneMgr:SceneManager
    timeMgr:TimeManager
    platFormMgr:PlatformBase
    logMgr:LogManager
    taskMgr:TaskManager
    constructor(){
        super();
        globalThis.game = this;
    }
    init(){
        this.resMgr = ResManager.getInstance();
        this.panelMgr = PanelManager.getInstance();
        this.sceneMgr = SceneManager.getInstance();
        this.timeMgr = TimeManager.getInstance();
        this.logMgr = LogManager.getInstance();
        this.taskMgr = TaskManager.getInstance();
        switch(getPlatForm()){
            case PLATFORM_TYPE.ANDROID:
                this.platFormMgr = AndroidPlatFormManager.getInstance();
            break
            default:
                this.platFormMgr = WebPlatfromManager.getInstance();
            break
        } 

    }

};