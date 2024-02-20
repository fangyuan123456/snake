import { SocketType } from "../Game";
import { CompBase } from "../base/CompBase";
import DataBase from "../base/DataBase";
import { Dic } from "../interface/I_Common";
import { I_enterRoomRes, I_frameMsgRes } from "../interface/I_Game";
import { I_roomInfo } from "../interface/I_Info";
export default class RoomData extends CompBase{
    curFrameId:number = null
    frames:Dic<number[]>= {}
    start(): void {
        game.roomData = this;
        game.netMgr.onMsg("frameMsg",(data)=>{
            this.onFrameMsg(data);
        },this,SocketType.game)
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
    }
}