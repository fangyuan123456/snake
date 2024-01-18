import { Session } from "mydog";

export default class Handler {
    constructor() {
    }
    getRoomInfo(msg: {}, session: Session, next: Function){
        let player = infoGame.getPlayer(session.uid);
        if(player){
            let roomInfo = player.roomInfo;
            if(roomInfo){
                next({roomId:roomInfo.roomId,roomIp:roomInfo.roomIp})
                return;
            }
        }
        next({roomId:0,roomIp:""})
    }
}