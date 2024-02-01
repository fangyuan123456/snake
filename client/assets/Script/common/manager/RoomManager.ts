import { SceneBase } from "../base/SceneBase";
import { SingleBase } from "../base/SingleBase";
import { ROOM_TYPE } from "../interface/I_Game";
export class RoomManager extends SingleBase{
    private roomType:ROOM_TYPE = ROOM_TYPE.FIGHT
    getRoomType():ROOM_TYPE{
        return this.roomType
    }
    setRoomType(roomTye:ROOM_TYPE){

    }
}