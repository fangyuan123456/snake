import { SceneBase } from "../base/SceneBase";
import { SingleBase } from "../base/SingleBase";
export enum ROOM_TYPE{
    GAME_FIGHT
}
export class RoomManager extends SingleBase{
    private roomType:ROOM_TYPE = ROOM_TYPE.GAME_FIGHT
    getRoomType():ROOM_TYPE{
        return this.roomType
    }
    setRoomType(roomTye:ROOM_TYPE){

    }
}