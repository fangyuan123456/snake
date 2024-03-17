import { Dic } from "./ICommon"

export interface I_roleMem {
    "roomId": number,        // 场景序号（主图序号即地图id，副本序号则是从1000开始的）
    "roomIp": string,           // token
}
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
export enum e_InfoType{
    role="role",
    asset="asset",
    inviteReward = "inviteReward"
}