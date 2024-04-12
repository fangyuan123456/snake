import { SceneBase } from "../base/SceneBase";
import { SingleBase } from "../base/SingleBase";
import { e_RoomType } from "../interface/I_Game";
export class RoomManager extends SingleBase{
    private roomType:e_RoomType = e_RoomType.FIGHT
    getRoomType():e_RoomType{
        return this.roomType
    }
    setRoomType(roomTye:e_RoomType){

    }
}