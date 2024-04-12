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
import { RoomManager } from "./manager/RoomManager";
import { AduintManager } from "./manager/AduintManager";
import GameData from "./data/GameData";
import { OtherInfoData } from "./data/OtherInfoData";
import RoomData from "../room/data/RoomData";
import { StorgeManager } from "./manager/StorgeManager";
import { DataBindManager } from "./manager/DataBindManager";
import { ConfigManager } from "./manager/ConfigManager";
import { SoundManager } from "./manager/SoundsManager";

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
    storgeMgr:StorgeManager
    soundsMgr:SoundManager

    userData:UserData
    roomMgr: RoomManager;
    aduintMgr: AduintManager;
    gameData: GameData;
    roomData:RoomData;
    configMgr: ConfigManager;
    otherInfoData: OtherInfoData;
    dataBindMgr:DataBindManager;
    persistNode: cc.Node;
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
        this.roomMgr = RoomManager.getInstance();
        this.aduintMgr = AduintManager.getInstance();
        this.configMgr = ConfigManager.getInstance();
        this.storgeMgr = StorgeManager.getInstance();
        this.soundsMgr = SoundManager.getInstance();
    

        this.userData = UserData.getInstance();
        this.gameData = GameData.getInstance();
        this.otherInfoData = OtherInfoData.getInstance();
        this.dataBindMgr = DataBindManager.getInstance();
        switch(getPlatForm()){
            case PLATFORM_TYPE.ANDROID:
                this.platFormMgr = AndroidPlatFormManager.getInstance();
            break
            default:
                this.platFormMgr = WebPlatfromManager.getInstance();
            break
        } 

    }
    getPersistNode(){
        if(!this.persistNode){
            this.persistNode = new cc.Node();
            cc.director.getScene().addChild(this.persistNode);
            cc.game.addPersistRootNode(this.persistNode)
        }
        return this.persistNode
    }

};