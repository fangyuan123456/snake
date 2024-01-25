import RemoteBase from "../../../../common/base/RemoteBase";
import { I_roleInfo } from "../../../../common/interface/IInfo";
import { TableName } from "../../../../common/manager/SqlManager";

declare global {
    interface Rpc {
        info: {
            main: Remote,
        }
    }
}
export default class Remote extends RemoteBase {
    constructor() {
        super();
    }
    async createPlayer(role:I_roleInfo){
        infoGame.createPlayer(role.uid,role);
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
        }else{
            game.sqlMgr.select(TableName.USER,{uid:uid}).then((data:I_roleInfo)=>{
                let inviteUids = data.inviteUids || "";
                if(inviteUids == ""){
                    inviteUids+=inviteUid;
                }else{
                    inviteUids+="#"+inviteUid;
                }
                game.sqlMgr.update(TableName.USER,{inviteUids:inviteUids},{uid:uid})
            })
        }
    }
    async getRoomPlayerInfo(uid:number){
        let player = infoGame.getPlayer(uid);
        return {
            roleInfo:player.role
        }
    }
}