import { Dic } from "./ICommon"
export interface I_roleInfo {
    uid: number,              // uid
    openId:string,
    nickName: string,         // 昵称
    avatarUrl:string,
    gender?:number,
    city?:string,
    country?:string,
    province?:string
}
export interface I_asset {
    items:Dic<I_item>,
}
export interface I_score{
    score:number,
    rankScore:number
}
export interface I_inviteReward {
    inviteUids:number[],
    getRewardIndexs:number[]
}
export interface I_item {
    num: number,
    level?:number,
    countEndTime?:number
}