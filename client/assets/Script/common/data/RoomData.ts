import { SocketType } from "../Game";
import { CompBase } from "../base/CompBase";
import DataBase from "../base/DataBase";
import { SCENE_NAME } from "../base/SceneBase";
import { Dic } from "../interface/I_Common";
import { I_enterRoomRes, I_frameMsgRes } from "../interface/I_Game";
import { I_roomInfo } from "../interface/I_Info";
export default class RoomData extends CompBase{
    curFrameId:number = null
    frames:Dic<number[]>= {}
    start(): void {
        game.roomData = this;
        this.enterRoom();
        game.netMgr.onMsg("frameMsg",(data)=>{
            this.onFrameMsg(data);
        },this,SocketType.game)
    }
    enterRoom(){
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
                if(!game.netMgr.socketMap[SocketType.game]){
                    game.netMgr.createSocket(data.roomIp,SocketType.game,true);
                    game.netMgr.onReady(()=>{
                        game.netMgr.sendSocket({msgHead:"enterRoom",msgData:{}},(data:I_enterRoomRes)=>{
                            this.setRoomInfo(data);
                            game.eventMgr.dispatch("gameInit");
                        },this,SocketType.game)
                    },this,SocketType.game)
                }
            }
        },this);
    }
    setRoomInfo(roomInfo:I_enterRoomRes){

    }
    onFrameMsg(msg:I_frameMsgRes[]){
        for(let i in msg){
            this.frames[msg[i].uid] = msg[i].frames;
        }
    }
    getPlayType(uid:number){
        this.curFrameId++;
        let frames = this.frames[uid];
        for(let i in frames){
            let frameId = Math.floor(frames[i]/10);
            let playType = frames[i]%10;
            if(frameId == this.curFrameId){
                return playType;
            }
        }
    }
    protected onDestroy(): void {
        game.roomData = null;
        game.netMgr.closeAndDestroySocket(SocketType.game);
    }
}