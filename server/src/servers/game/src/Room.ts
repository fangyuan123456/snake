import { Session } from "mydog";
import { RoomPlayer } from "./RoomPlayer";
import { Dic, I_msg } from "../../../common/interface/ICommon";
import { GameConfig } from "./GameConfig";
import { UdpSession } from "../../../common/net/UdpSession";
import { I_roomPlayerInfo, e_roomType } from "../../../common/interface/IGame";
interface playTypeData{
    uid?:number
    playType?:number
}
export class Room{
    isGameStart:boolean = false;
    roomPlayers:{[key:number]:RoomPlayer} = {};
    roomType:e_roomType = e_roomType.FIGHT
    constructor(uidList:number[],roomType:e_roomType){
        this.roomType = roomType;
        for(let i in uidList){
            let uid = uidList[i];
            this.roomPlayers[uid] = new RoomPlayer(this,uid);
        }
    }
    getRoomPlayer(uid:number){
        return this.roomPlayers[uid]
    }
    async getAllPlayerInfo(){
        let frameData = this.getFrameData();
        let data:I_roomPlayerInfo[] = [];
        for(let i in this.roomPlayers){
            let player = this.roomPlayers[i];
            let infoData = await player.getMyInfo();
            data.push({
                uid:infoData.uid,
                nickName:infoData.role!.nickName||"",
                avatarUrl:infoData.role!.avatarUrl||"",
                rankScore:infoData.asset!.rankScore,
                frames:frameData[infoData.uid]
            }); 
        }
        return data;
    }
    boardMsg(msg:I_msg){
        for(let i in this.roomPlayers){
            gameGame.sendMsg(this.roomPlayers[i].uid,msg);
        }
    }
    checkGameStart(){
        if(!this.isGameStart){
            for(let i in this.roomPlayers){
                if(!this.roomPlayers[i].isEnterGame){
                    return false;
                }
            }
            setInterval(this.update.bind(this),GameConfig.frameDt);
        }
        return true;
    }
    async enterRoomHandler(msg: any, session: Session|UdpSession, next: Function){
        let data = await this.getAllPlayerInfo();
        let player = this.getRoomPlayer(session.uid);
        player.isEnterGame = true;
        this.checkGameStart();
        next({playerInfos:data,gameTime:0})
    }
    frameMsgHandler(msg:{frameId:number,frameType:number},session:Session|UdpSession,next:Function){
        if(this.isGameStart){
            let player = this.getRoomPlayer(session.uid);
            if(player){
                player.frameMsg(msg);
            }
        }
    }
    getFrameData(frameId:number = 0){
        let data:Dic<any> = {};
        for(let i in this.roomPlayers){
            let player = this.roomPlayers[i];
            data[player.uid] = player.getFrames(frameId);
        }
        return data;
    }
    sendFrame(){
        for(let i in this.roomPlayers){
            let player = this.roomPlayers[i];
            let frameData = this.getFrameData(player.clientCurFrameId);
            gameGame.sendMsg(player.uid,{msgHead:"frameMsg",msgData:{frames:frameData,frameId:player.clientCurFrameId}})
        }
    }
    update(){
        for(let i in this.roomPlayers){
            let player = this.roomPlayers[i];
            player.update();
        }
        this.sendFrame();
    }
}