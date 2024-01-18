import { Application } from "mydog";
import { GameServerBase } from "../../common/base/GameServerBase";
import { Room } from "./src/Room";
declare global{
    namespace globalThis{
        var gameGame:GameServer
    }
}
export class GameServer extends GameServerBase{
    rooms:{[key:number]:Room} = {};
    constructor(app:Application){
        super(app);
        gameGame = this;
    }
    createRoom(msg:{roomId:number,uidList:number[]}){
        if(this.rooms[msg.roomId]){
            return false;
        }
        this.rooms[msg.roomId] = new Room(msg.uidList);
    }
    getRoom(roomId:number){
        return this.rooms[roomId]
    }
    getRoomPlayer(roomId:number,uid:number){
        let room = this.getRoom(roomId);
        if(room){
            return room.getRoomPlayer(uid);
        }
    }
}