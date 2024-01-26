import { CompBase } from "../base/CompBase"
import DataBase from "../base/DataBase";
import { I_assetInfo, I_inviteReward, I_roleInfo, I_roomInfo } from "../interface/I_Info";
import { I_loginRes } from "../interface/I_Login";
export default class UserData extends DataBase{
    uid:number = 0
    centerIp:string  = ""
    offLineReReqInfoList:string[] = ["inviteRewardInfo"]
    constructor(){
        super(["assetInfo","roleInfo","roomInfo","inviteRewardInfo"]);
    }
    setLoginData(loginData:I_loginRes){
        this.uid = loginData.uid,
        this.centerIp = loginData.centerIp
        delete loginData.centerIp;
        this.setInfo("roleInfo",loginData)
    }
    getRoleInfo(target:CompBase):Promise<I_roleInfo>{
        return this.getInfo("roleInfo",target)
    }
    getRoomInfo(target:CompBase):Promise<I_roomInfo>{
        return this.getInfo("roomInfo",target)
    }
    getAssetInfo(target:CompBase):Promise<I_assetInfo>{
        return this.getInfo("assetInfo",target)
    }
    getInviteRewardInfo(target:CompBase):Promise<I_inviteReward>{
        return this.getInfo("inviteRewardInfo",target)
    }
}