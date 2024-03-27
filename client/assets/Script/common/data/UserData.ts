import { CompBase } from "../base/CompBase"
import DataBase, { dataKeyCfg } from "../base/DataBase";
import { Dic } from "../interface/I_Common";
import { I_assetInfo, I_inviteReward, I_roleInfo, I_roomInfo } from "../interface/I_Info";
import { I_loginRes } from "../interface/I_Login";
const dataKeyCfg:dataKeyCfg = {
    assetInfo:{
        isConnectReq:true,
    },
    roleInfo:{
        isConnectReq:true,
    },
    inviteRewardInfo:{
        isConnectReq:true,
    }
}
export default class UserData extends DataBase{
    uid:number = 0
    isDropToolOn:boolean = false
    friendMatchUid:number = null
    centerIp:string  = ""
    otherPlayerInfo: Dic<I_roleInfo> = {};
    constructor(){
        super(dataKeyCfg);
    }
    setLoginData(loginData:I_loginRes){
        this.uid = loginData.playerInfo.uid,
        this.centerIp = loginData.centerIp
        delete loginData.centerIp;
        this.setInfo("roleInfo",loginData)
    }
    getRoleInfo(callBack:(data:I_roleInfo)=>void,target:CompBase){
        this.getInfo("roleInfo",callBack,target)
    }
    getAssetInfo(callBack:(data:I_assetInfo)=>void,target:CompBase){
        this.getInfo("assetInfo",callBack,target)
    }
    getInviteRewardInfo(callBack:(data:I_inviteReward)=>void,target:CompBase){
        this.getInfo("inviteRewardInfo",callBack,target)
    }
}