import { CompBase } from "../base/CompBase";
import DataBase, { dataKeyCfg } from "../base/DataBase";
import { Dic } from "../interface/I_Common";
import { I_roomInfo } from "../interface/I_Info";
const dataKeyCfg:dataKeyCfg = {
    roomInfo:{
        isConnectReq:true,
        ignoreHaveData:true
    }
}
export default class GameData extends DataBase{
    isDropToolOn:boolean = false
    friendMatchUid:number = null
    centerIp:string  = ""
    constructor(){
        super(dataKeyCfg);
    }
    getRoomInfo(callBack:(data:I_roomInfo)=>void,target:CompBase){
        this.getInfo("roomInfo",callBack,target);
    }
    getRoomInfoSync():I_roomInfo{
        return this.getInfoSync("roomInfo");
    }

}