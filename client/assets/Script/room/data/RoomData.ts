import { SocketType } from "../../common/Game";
import { CompBase } from "../../common/base/CompBase";
import { SCENE_NAME } from "../../common/base/SceneBase";
import { addFrameCfg, gameDefine } from "../../common/configs/RoomCfg";
import { Dic } from "../../common/interface/I_Common";
import { I_enterRoomRes, I_frameMsgRes } from "../../common/interface/I_Game";
import { I_roomInfo } from "../../common/interface/I_Info";
import SnakeBase from "../base/SnakeBase";
export default class RoomData extends CompBase{
    mySnake:SnakeBase
    curFrameId:number = null
    frameSpeed:number = 1
    frameLeftTime:number = gameDefine.frameDt;
    frameData:Dic<number>
    userInputMap:Dic<number> = {};//玩家操作类型对象，收到服务操作会清除
    roomInfo:I_enterRoomRes;
    isInit:boolean;
    inputType:number = gameDefine.defaultDir;
    predictFrameId: number;
    posList:Dic<string[]> = {};
    start(): void {
        game.roomData = this;
        this.sendEnterRoom();
    }
    sendEnterRoom(){
        game.gameData.getRoomInfo((data)=>{
            if(data.roomId<=0){
                game.alertMgr.showTiShiBox({content:"对局已结束！",btnCallBackList:[
                    {
                        callBack:()=>{
                            game.sceneMgr.changeScene(SCENE_NAME.MENUSCENE);
                        }
                    }
                ]})
                game.netMgr.closeAndDestroySocket(SocketType.game);
            }else{
                if(!this.isInit){
                    this.isInit = true;
                    this.init(data);
                }
            }
        },this);
    }
    init(data:I_roomInfo){
        game.netMgr.onReady(()=>{
            game.netMgr.sendSocket({msgHead:"enterRoom",msgData:{}},(data:I_enterRoomRes)=>{
                this.setRoomInfo(data);
                game.eventMgr.dispatch("gameInit");
            },this,SocketType.game)
        },this,SocketType.game)
        game.netMgr.onMsg("frameMsg",(data)=>{
            this.onFrameMsgHandler(data);
        },this,SocketType.game)
        game.netMgr.createSocket(data.roomIp,SocketType.game,true);
    }
    sendFrameMsg(){
        this.userInputMap[this.roomInfo.serverFrameId+1] = this.inputType
        game.netMgr.sendSocket({msgHead:"frameMsg",msgData:{frameId:this.roomInfo.serverFrameId,frameType:this.inputType}},null,this,SocketType.game)
    }
    setRoomInfo(roomInfo:I_enterRoomRes){
        this.roomInfo = roomInfo;
    }
    readFrame(uid:number,frameId?:number):number{
        frameId = frameId || this.curFrameId;
        return this.roomInfo.playerInfos[uid].frames[frameId-1];
    }
    getPredictUserInput(frameId):number{
        return this.userInputMap[frameId];
    }
    onFrameMsgHandler(msg:I_frameMsgRes){
        if(this.roomInfo){
            this.roomInfo.serverFrameId = msg.serverFrameId;
            delete this.userInputMap[this.roomInfo.serverFrameId]
            for(let uid in msg.frameData){
                let frames = msg.frameData[uid].frames;
                let len = frames.length;
                for(let i = 0;i<len;i++){
                    let frameId = this.roomInfo.serverFrameId - len + i;
                    this.roomInfo.playerInfos[uid].frames[frameId] = frames[i]
                }
            }
        }
    }
    timestamp:number = 0
    logicUpdate(frameSpeed:number){
        this.curFrameId++;
        let isInWaitFrameState = this.roomInfo.serverFrameId<this.curFrameId;
        this.sendFrameMsg();
        this.frameLeftTime = gameDefine.frameDt;
        if(isInWaitFrameState){
            this.predictFrameId = this.roomInfo.serverFrameId+1;
            game.eventMgr.dispatch("predictNextFrame",this.curFrameId)
        }else{
            this.predictFrameId = null;
            game.eventMgr.dispatch("logicUpdate",frameSpeed)
            this.checkCollision();
        }
    }
    reelBackToServerFrame(){
        let predictFrameId = this.predictFrameId;
        this.predictFrameId = null;
        game.eventMgr.dispatch("useSnapshot")
        for(let i = predictFrameId;i<=this.curFrameId;i++){
            if(i<=this.roomInfo.serverFrameId){
                game.eventMgr.dispatch("reelBackToServerFrame",i)
                this.checkCollision();
            }else{
                this.predictFrameId = this.roomInfo.serverFrameId+1;
                game.eventMgr.dispatch("predictNextFrame",i)
            }
        }
    }
    collectUserInput(inputType?:number){
        this.inputType = inputType;
    }
    getFrameSpeed(){
        let frameOffset = this.roomInfo.serverFrameId - this.curFrameId
        for(let i = addFrameCfg.length-1;i>=0;i--){
            if(frameOffset>=addFrameCfg[i].frameOffset){
                return addFrameCfg[i].speed;
            }
        }
        return 1;
    }
    frameUpdate(dt,ignoreFrameSpeed?){
        let frameSpeed = this.getFrameSpeed();
        let dtTime = !ignoreFrameSpeed?dt*frameSpeed:dt;
        if(this.frameLeftTime<=dtTime){
            let offsetTime = dtTime - this.frameLeftTime;
            this.logicUpdate(frameSpeed);
            this.frameUpdate(offsetTime,true);
        }else{
            this.frameLeftTime -= dtTime;
        }
    }
    protected update(dt: number): void {
        if(this.roomInfo&&this.roomInfo.serverFrameId>0){
            if(this.predictFrameId && this.roomInfo.serverFrameId>=this.predictFrameId){
                this.reelBackToServerFrame();
            }
            this.frameUpdate(dt);
        }
    }
    checkCollision(){

    }
    protected onDestroy(): void {
        game.roomData = null;
    }
}