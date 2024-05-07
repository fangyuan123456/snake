import { Session } from "mydog";
import { I_asset, I_inviteReward, I_roleInfo, I_score } from "../../../../common/interface/IInfo";
import { e_InfoBundle } from "../../src/InfoConfig";
export default class Handler {
    constructor() {
    }
    async getRoleInfo(msg: any, session: Session, next: Function) {
        let uid = session.uid;
        let roleInfo = await game.infoMgr.getInfoByBundle<I_roleInfo>(uid,e_InfoBundle.getRoleInfo);
        next(roleInfo);
    }
    async getAssetInfo(msg: any, session: Session, next: Function) {
        let uid = session.uid;
        let roleInfo = await game.infoMgr.getInfoByBundle<I_asset>(uid,e_InfoBundle.getAssetInfo);
        next(roleInfo);
    }
    async getInviteRewardInfo(msg: any, session: Session, next: Function) {
        let uid = session.uid;
        let roleInfo = await game.infoMgr.getInfoByBundle<I_inviteReward>(uid,e_InfoBundle.getInviteRewardInfo);
        next(roleInfo);
    }
    async getScoreInfo(msg: any, session: Session, next: Function) {
        let uid = session.uid;
        let roleInfo = await game.infoMgr.getInfoByBundle<I_score>(uid,e_InfoBundle.getScoreInfo);
        next(roleInfo);
    }
}