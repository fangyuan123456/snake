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
        isConnectReq:false,
    }
}
export default class UserData extends DataBase{
    uid:number = 0
    centerIp:string  = ""
    otherPlayerInfo: Dic<I_roleInfo> = {};
    constructor(){
        super(dataKeyCfg);
    }
    setLoginData(loginData:I_loginRes){
        this.uid = loginData.uid,
        this.centerIp = loginData.centerIp
        delete loginData.centerIp;
        this.setInfo("roleInfo",loginData)
    }
    getRoleInfo(callBack:(I_roleInfo)=>void,target:CompBase){
        this.getInfo("roleInfo",callBack,target)
    }
    getAssetInfo(callBack:(I_assetInfo)=>void,target:CompBase){
        this.getInfo("assetInfo",callBack,target)
    }
    getInviteRewardInfo(callBack:(I_inviteReward)=>void,target:CompBase){
        this.getInfo("inviteRewardInfo",callBack,target)
    }
}