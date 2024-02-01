import { CompBase } from "../base/CompBase"
import DataBase, { dataKeyCfg } from "../base/DataBase";
import { Dic } from "../interface/I_Common";
import { I_assetInfo, I_inviteReward, I_roleInfo, I_roomInfo } from "../interface/I_Info";
import { I_loginRes } from "../interface/I_Login";
const dataKeyCfg:dataKeyCfg = {
    assetInfo:{
        isLoginGet:true,
        isOffLineReq:false
    },
    roleInfo:{
        isLoginGet:true,
        isOffLineReq:false
    },
    roomInfo:{
        isLoginGet:true,
        isOffLineReq:false
    },
    inviteRewardInfo:{
        isLoginGet:false,
        isOffLineReq:false
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
    getRoleInfo(callBack:(any)=>void,target:CompBase){
        this.getInfo("roleInfo",callBack,target)
    }
    getRoomInfo(callBack:(any)=>void,target:CompBase){
        this.getInfo("roomInfo",callBack,target)
    }
    getAssetInfo(callBack:(any)=>void,target:CompBase){
        this.getInfo("assetInfo",callBack,target)
    }
    getInviteRewardInfo(callBack:(any)=>void,target:CompBase){
        this.getInfo("inviteRewardInfo",callBack,target)
    }
    getRankLevel(){
        return 1;
    }
}