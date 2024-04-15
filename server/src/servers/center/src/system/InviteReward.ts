import { Session } from "mydog";
import { SystemBase } from "../../../../common/base/SystemBase";
import { I_rankItemInfo } from "../../../../common/interface/ICenter";
import { Dic } from "../../../../common/interface/ICommon";
import { e_InfoBundle } from "../CenterConfig";

export class InviteReward extends SystemBase{
    constructor(){
        super();
    }
    async getInviteRewardReqHander(msg: any, session: Session, next: Function) {
        let rewardInfo = await game.infoMgr.getInfoByBundle(session.uid,e_InfoBundle.getInviteRewardInfo);
        
        // let uid = session.uid;
        // let roleInfo = await game.infoMgr.getInfoByBundle<I_asset>(uid,e_InfoBundle.getAssetInfo);
        // next(roleInfo);
    }
}