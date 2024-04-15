import { Application } from "mydog";
import { GameServerBase } from "../../common/base/GameServerBase";
import { MatchConfig } from "./src/MatchConfig";
import { serverType } from "../../common/config/CommonCfg";
import { Dic } from "../../common/interface/ICommon";
import { I_MatchRoleInfo, I_playerRoomId } from "../../common/interface/IMatch";
import { e_roomType } from "../../common/interface/IGame";
declare global{
    namespace globalThis{
        var matchGame:MatchServer
    }
}
export class MatchServer extends GameServerBase{
    matchList:number[] = [];
    inviteRoom:Dic<I_MatchRoleInfo[]> = {}
    playerRoomIdInfo:Dic<I_playerRoomId> = {};
    roomIdIndex = 10000;
    inviteRoomIndex = 1;
    constructor(app:Application){
        super(app);
        globalThis.matchGame = this;
    }
    async inviteFriend(data:{uid:number,isMatch:boolean,inviteKey?:string}){
        let inviteKey:string = "";
        if(!data.inviteKey){
            for(let i in this.inviteRoom){
                for(let j in this.inviteRoom[i]){
                    if(this.inviteRoom[i][j].uid == data.uid){
                        inviteKey = i;
                        break;
                    }
                }
                if(inviteKey)break;
            }
        }else{
            inviteKey = data.inviteKey;
        }
        let getRoleIndexFunc = (uid:number)=>{
            let roles = this.inviteRoom[inviteKey];
            for(let i in roles){
                if(roles[i].uid == uid){
                    return Number(i);
                }
            }
        }
        let getUids = ()=>{
            let uids = [];
            let roles = this.inviteRoom[inviteKey];
            for(let i in roles){
                uids.push(roles[i].uid);
            }
            return uids;
        }
        let openRoomFunc = async (matchUidList:number[])=>{
            let roomId = this.inviteRoomIndex++;
            let gameServer = game.app.getServerById(game.utilsMgr.getSid(roomId,serverType.game));
            let roomIp = game.utilsMgr.getServerIp(gameServer);
            for(let i in matchUidList){
                let uid = matchUidList[i];
                this.playerRoomIdInfo[uid] = {roomId:roomId,roomIp:roomIp}
            }
            game.app.rpc(gameServer.id).game.main.createRoom({roomId:roomId,uidList:matchUidList,roomType:e_roomType.FRIEND})
            game.sendMsg(matchUidList,{msgHead:"getRoomInfo",msgData:{roomId:roomId,roomIp:roomIp}})
        }
        if(inviteKey&&inviteKey!=""){
            this.inviteRoom[inviteKey] = this.inviteRoom[inviteKey] || [];
            let index = getRoleIndexFunc(data.uid);
            if(data.isMatch){
                if(!index){
                    let roleInfo:I_MatchRoleInfo = await game.infoMgr.getInfoByBundle<I_MatchRoleInfo>(data.uid,"matchRoleInfo")
                    this.inviteRoom[inviteKey].push(roleInfo);
                }
            }else{
                if(index){
                    this.inviteRoom[inviteKey].splice(index,1);
                }
            }
            let uids = getUids();
            let playerLen  = uids.length;
            let isStart = playerLen == MatchConfig.roomGameNum;
            game.sendMsg(getUids(),{msgHead:"InviteFriend",msgData:{roles:this.inviteRoom[inviteKey],isStart:isStart}})
            if(isStart){
                openRoomFunc(uids);
                delete this.inviteRoom[inviteKey];
            }
        }
    }
    setConfig(){
        super.setConfig();
    }
    match(data:{uid:number,isMatch:boolean}){
        let checkMatchOkAndOpenRoom = ()=>{
            let openRoomFunc = async (matchUidList:number[])=>{
                let roomId = this.roomIdIndex++;
                let gameServer = game.app.getServerById(game.utilsMgr.getSid(roomId,serverType.game));
                let roomIp = game.utilsMgr.getServerIp(gameServer)
                let roles:I_MatchRoleInfo[] = [];
                for(let i in matchUidList){
                    let uid = matchUidList[i];
                    let roleInfo:I_MatchRoleInfo = await game.infoMgr.getInfoByBundle<I_MatchRoleInfo>(uid,"matchRoleInfo")
                    roles.push(roleInfo);
                    this.playerRoomIdInfo[uid] = {roomId:roomId,roomIp:roomIp}
                }
                game.app.rpc(gameServer.id).game.main.createRoom({roomId:roomId,uidList:matchUidList,roomType:e_roomType.FRIEND});
                game.sendMsg(matchUidList,{msgHead:"match",msgData:{roles:roles}});
                game.sendMsg(matchUidList,{msgHead:"getRoomInfo",msgData:{roomId:roomId,roomIp:roomIp}})
            }
            let num = MatchConfig.roomGameNum;
            while(this.matchList.length>=num){
                let matchUidList = [];
                for(let i = num-1;i>=0;i--){
                    let uid = this.matchList[i];
                    this.matchList.splice(i,1);
                    matchUidList.push(uid);
                }
                openRoomFunc(matchUidList);
            }
        }
        let index = this.matchList.indexOf(data.uid);
        if(data.isMatch){
            if(index<0){
                this.matchList.push(data.uid);
            }
        }else{
            if(index>=0){
                this.matchList.splice(index,1);
            }
        }
        checkMatchOkAndOpenRoom();
    }


    getRoomInfo(uid:number){
        return this.playerRoomIdInfo[uid] || {roomId:0,roomIp:""}
    }
    userLeave(uid:number){
        let index = this.matchList.indexOf(uid);
        if(index>=0){
            this.match({uid:uid,isMatch:false});
        }else{
            this.inviteFriend({uid:uid,isMatch:false});
        }
    }
}