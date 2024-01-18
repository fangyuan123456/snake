import { Session } from "mydog";
import { RoomPlayer } from "./RoomPlayer";

export class Room{
    roomPlayers:{[key:number]:RoomPlayer} = {};
    constructor(uidList:number[]){
        for(let i in uidList){
            let uid = uidList[i];
            this.roomPlayers[uid] = new RoomPlayer(uid);
        }
    }
    getRoomPlayer(uid:number){
        return this.roomPlayers[uid]
    }
    async enterRoom(msg: any, session: Session, next: Function){
        let data = [];
        for(let i in this.roomPlayers){
            let player = this.roomPlayers[i];
            let infoData = await player.getMyInfo();
            data.push({
                uid:infoData.uid,
            }); 
        }
        next({roleInfo:data})
    }
}