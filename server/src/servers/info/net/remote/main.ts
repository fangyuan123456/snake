import { I_roleInfo } from "../../../../common/interface/IInfo";
import { InfoServer } from "../../InfoServer";

declare global {
    interface Rpc {
        info: {
            main: Remote,
        }
    }
}
export default class Remote {
    constructor() {
    }
    createPlayer(role:I_roleInfo){
        let infoGame = game as InfoServer;
        infoGame.createPlayer(role);
    }
    setRoomInfo(data:{uid:number,roomId:number,roomIp:string}){
        let player = infoGame.getPlayer(data.uid);
        if(player){
            player.setRoomInfo({roomId:data.roomId,roomIp:data.roomIp});
        }
    }
    updatePlayInviteData(uid:number,inviteUid:number){
        let player = infoGame.getPlayer(uid);
        if(player){
            player.updateInviteData(inviteUid);
        }
    }
    async getRoomPlayerInfo(uid:number){
        let player = infoGame.getPlayer(uid);
        return {
            roleInfo:player.role
        }
    }
}