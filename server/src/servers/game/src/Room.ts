import { Session } from "mydog";
import { RoomPlayer } from "./RoomPlayer";
import { Dic, I_msg } from "../../../common/interface/ICommon";
import { GameConfig } from "./GameConfig";
import { UdpSession } from "../../../common/net/UdpSession";
import { I_roomPlayerInfo, e_roomType } from "../../../common/interface/IGame";
export class Room{
    isGameStart:boolean = false;
    roomPlayers:{[key:number]:RoomPlayer} = {};
    roomType:e_roomType = e_roomType.FIGHT
    frameId:number = 0;
    gameTime:number = 0;
    constructor(uidList:number[],roomType:e_roomType){
        this.roomType = roomType;
        for(let i in uidList){
            let uid = uidList[i];
            this.roomPlayers[uid] = new RoomPlayer(this,uid);
        }
    }



    async enterRoomHandler(msg: any, session: Session|UdpSession, next: Function){
        let data = await this.getAllPlayerInfo();
        let player = this.getRoomPlayer(session.uid);
        player.isEnterGame = true;
        this.checkGameStart();
        next({playerInfos:data,gameTime:this.gameTime,serverFrameId:this.frameId,})
    }
    frameMsgHandler(msg:{frameId:number,frameType:number},session:Session|UdpSession,next:Function){
        if(this.isGameStart){
            let player = this.getRoomPlayer(session.uid);
            if(player){
                player.frameMsg(msg);
            }
        }
    }
    getRoomPlayer(uid:number){
        return this.roomPlayers[uid]
    }
    async getAllPlayerInfo(){
        let frameData = this.getFrameData();
        let data:Dic<I_roomPlayerInfo> = {};
        for(let i in this.roomPlayers){
            let player = this.roomPlayers[i];
            let infoData = await player.getMyInfo();
            data[infoData.uid] = {
                nickName:infoData.role!.nickName||"",
                avatarUrl:infoData.role!.avatarUrl||"",
                rankScore:infoData.asset!.rankScore,
                frames:frameData[player.uid].frames
            }; 
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
            this.isGameStart = true;
            setInterval(this.update.bind(this),GameConfig.frameDt);
        }
        return true;
    }
    getFrameData(frameId:number = 0){
        let data:Dic<{frames:Dic<number>}> = {};
        for(let i in this.roomPlayers){
            let player = this.roomPlayers[i];
            data[player.uid] = {frames:player.getFrames(frameId)}
        }
        return data;
    }
    sendFrame(){
        for(let i in this.roomPlayers){
            let player = this.roomPlayers[i];
            let frameData = this.getFrameData(player.clientReceiveFrameId);
            gameGame.sendMsg(player.uid,{msgHead:"frameMsg",msgData:{frameData:frameData,serverFrameId:this.frameId}})
        }
    }
    update(){
        this.gameTime = Math.round(GameConfig.frameDt/1000 + this.gameTime);
        this.frameId++;
        for(let i in this.roomPlayers){
            let player = this.roomPlayers[i];
            player.update();
        }
        this.sendFrame();
    }
}