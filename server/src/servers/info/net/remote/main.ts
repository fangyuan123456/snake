import RemoteBase from "../../../../common/base/RemoteBase";
import { Dic, I_playerAllInfo } from "../../../../common/interface/ICommon";
import { I_asset, I_inviteReward, I_roleInfo, e_InfoType } from "../../../../common/interface/IInfo";
import { e_TableName } from "../../SqlManager";

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
    async userLoginIn(uid:number){
        return await infoGame.userLoginIn(uid);
    }
    userLoginOut(uid:number){
        infoGame.userLoginOut(uid);
    }
    async getPlayerInfo(uid:number,infoKey?:Dic<any>){
        return await infoGame.getPlayerInfo(uid,infoKey);
    }
    setPlayerInfo(uid:number,info:Dic<any>){
        infoGame.setPlayerInfo(uid,info);
    }
}