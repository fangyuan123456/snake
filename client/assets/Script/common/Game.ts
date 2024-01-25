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
import { ProtoManager } from "./manager/ProtoManager";
import { EventManager } from "./manager/EventManager";
import { NetManager } from "./manager/NetManager";
import UserData from "./data/UserData";
import { AlertManager } from "./manager/AlertManager";
import { UtilsManager } from "./manager/UtilsManager";
import { PushMsgManager } from "./manager/PushMsgManager";

declare global {
    namespace globalThis {
        var game:Game /* 的类型 */
    }
}
export enum SocketType{
    center = "center",
    game = "game"
}
export class Game extends SingleBase{
    resMgr:ResManager
    panelMgr:PanelManager
    sceneMgr:SceneManager
    timeMgr:TimeManager
    platFormMgr:PlatformBase
    logMgr:LogManager
    taskMgr:TaskManager
    protoMgr:ProtoManager
    eventMgr:EventManager
    netMgr:NetManager
    alertMgr:AlertManager
    utilsMgr:UtilsManager
    pushMsgMgr:PushMsgManager

    userData:UserData
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
        this.protoMgr = ProtoManager.getInstance();
        this.eventMgr = EventManager.getInstance();
        this.netMgr = NetManager.getInstance();
        this.alertMgr = AlertManager.getInstance();
        this.utilsMgr = UtilsManager.getInstance();
        this.pushMsgMgr = PushMsgManager.getInstance();

        this.userData = UserData.getInstance();
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