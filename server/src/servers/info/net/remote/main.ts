import RemoteBase from "../../../../common/base/RemoteBase";
import { I_inviteReward, I_roleInfo } from "../../../../common/interface/IInfo";
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
        if(player && player.inviteReward){
            player.inviteReward.updateInviteData(inviteUid);
        }else{
            game.sqlMgr.select(TableName.INVITE_REWARD,{uid:uid}).then((allData:any)=>{
                let data = allData[0];
                if(data){
                    let inviteUids = data.inviteUids || "";
                    let inviteData = JSON.parse(inviteUids);
                    if(inviteData.indexOf(inviteUid)<0){
                        inviteData.push(inviteUid) 
                        game.sqlMgr.update(TableName.INVITE_REWARD,{inviteUids:inviteData},{uid:uid})
                    }
                }
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