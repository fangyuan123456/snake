
import { Dic, I_playerAllInfo } from "../../../../common/interface/ICommon";
declare global {
    interface Rpc {
        info: {
            main: Remote,
        }
    }
}
export default class Remote{
    constructor() {
    }
    async userRegister(openId:number){
        return await infoGame.userRegister(openId);
    }
    async onUserIn(uid:number){
        return await infoGame.userLoginIn(uid);
    }
    onUserLeave(uid:number){
        infoGame.userLoginOut(uid);
    }
    async getPlayerInfo(uid:number,infoKeyList?:string[]){
        return await infoGame.getPlayerInfo(uid,infoKeyList);
    }
    async getOnceInfo(uid:number,infoKeyList:string[]){
        return await infoGame.getOnceInfo(uid,infoKeyList);
    }
    setPlayerInfo(uid:number,info:Dic<any>){
        infoGame.setPlayerInfo(uid,info);
        infoGame.notifySetInfo(uid,info);
    }
}