import { Session } from "mydog";
import { e_InfoType } from "../../../../common/interface/IInfo";

export default class Handler {
    constructor() {
    }
    getRoomInfo(msg: {}, session: Session, next: Function){
        let player = infoGame.getPlayer(session.uid);
        if(player){
            let roomInfo = player.getRoomInfo();
            if(roomInfo){
                next({roomId:roomInfo.roomId,roomIp:roomInfo.roomIp})
                return;
            }
        }
        next({roomId:0,roomIp:""})
    }
    async getAssetInfo(msg: {}, session: Session, next: Function){
        let player = infoGame.getPlayer(session.uid);
        if(player){
            let assetInfo = await player.getInfo(e_InfoType.asset)
            next({assest:assetInfo})
        }
    }
}