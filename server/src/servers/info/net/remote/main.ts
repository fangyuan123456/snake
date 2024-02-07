import RemoteBase from "../../../../common/base/RemoteBase";
import { I_asset, I_inviteReward, I_roleInfo, e_InfoType } from "../../../../common/interface/IInfo";
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
    async openRoom(data:{uid:number,roomId:number,roomIp:string}){
        let player = infoGame.getPlayer(data.uid);
        player.setRoomInfo({roomId:data.roomId,roomIp:data.roomIp});
        return await this.getMatchRoleInfo({uid:data.uid});
    }
    setRoomInfo(data:{uid:number,roomId:number,roomIp:string}){
        let player = infoGame.getPlayer(data.uid);
        player.setRoomInfo({roomId:data.roomId,roomIp:data.roomIp});
    }
    async getMatchRoleInfo(data:{uid:number}){
        let player = infoGame.getPlayer(data.uid);
        let roleInfo = await player.getInfo(e_InfoType.role);
        let assetInfo = await player.getInfo(e_InfoType.asset);
        return {
            uid:data.uid,
            nickName:roleInfo.nickName||"",
            avatarUrl:roleInfo.avatarUrl||"",
            rankScore:assetInfo.rankScore
        }
    }
    async getRoomPlayerInfo(uid:number):Promise<{roleInfo:I_roleInfo,assetInfo:I_asset}>{
        let player = infoGame.getPlayer(uid);
        let roleInfo = await player.getInfo(e_InfoType.role);
        let assetInfo = await player.getInfo(e_InfoType.asset);
        return {
            roleInfo:roleInfo,
            assetInfo:assetInfo
        }
    }
}