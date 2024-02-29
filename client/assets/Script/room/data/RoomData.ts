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
    frameLeftTime:number = 0;
    frameData:Dic<number>
    roomInfo:I_enterRoomRes;
    isInit:boolean;
    collectPlayType:number;
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
        game.netMgr.createSocket(data.roomIp,SocketType.game,true);
        game.netMgr.onReady(()=>{
            game.netMgr.sendSocket({msgHead:"enterRoom",msgData:{}},(data:I_enterRoomRes)=>{
                this.setRoomInfo(data);
                game.eventMgr.dispatch("gameInit");
            },this,SocketType.game)
        },this,SocketType.game)
        game.netMgr.onMsg("frameMsg",(data)=>{
            this.onFrameMsgHandler(data);
        },this,SocketType.game)
    }
    sendFrameMsg(){
        let frameOffset = this.roomInfo.serverFrameId - this.curFrameId;
        if(this.collectPlayType && frameOffset < gameDefine.frameCanPlayOffset){
            game.netMgr.sendSocket({msgHead:"frameMsg",msgData:{frameId:this.roomInfo.serverFrameId,frameType:this.collectPlayType}},null,this,SocketType.game)
        }
    }
    setRoomInfo(roomInfo:I_enterRoomRes){
        this.roomInfo = roomInfo;
    }
    readFrame(uid:number):number{
        return this.roomInfo.playerInfos[uid].frames[this.curFrameId];
    }
    onFrameMsgHandler(msg:I_frameMsgRes){
        if(this.roomInfo){
            this.roomInfo.serverFrameId = msg.serverFrameId;
            for(let uid in msg.frameData){
                let frames = msg.frameData[uid].frames;
                for(let frameId in frames){
                    this.roomInfo.playerInfos[uid].frames[frameId] = frames[frameId]
                }
            }
        }
    }
    logicUpdate(frameSpeed:number){
        this.curFrameId++;
        this.sendFrameMsg();
        this.frameLeftTime = gameDefine.frameDt;
        game.eventMgr.dispatch("logicUpdate",frameSpeed)
    }
    setCollectPlayType(collectPlayType?:number){
        this.collectPlayType = collectPlayType;
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
        if(this.roomInfo && this.roomInfo.serverFrameId > this.curFrameId){
            let frameSpeed = this.getFrameSpeed();
            let dtTime = !ignoreFrameSpeed?dt*frameSpeed:dt;
            if(this.frameLeftTime<=dtTime){
                let offsetTime = dtTime - this.frameLeftTime;
                this.logicUpdate(frameSpeed);
                this.checkCollision();
                this.frameUpdate(offsetTime,true);
            }else{
                this.frameLeftTime -= dtTime;
            }
        }
    }
    protected update(dt: number): void {
        this.frameUpdate(dt);
    }
    checkCollision(){

    }
    protected onDestroy(): void {
        game.roomData = null;
        game.netMgr.closeAndDestroySocket(SocketType.game);
    }
}