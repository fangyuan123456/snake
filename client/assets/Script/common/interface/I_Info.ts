import { Dic } from "./I_Common"

export interface I_roleInfo {
    uid: number,              // uid
    openId:string,
    nickName: string,         // 昵称
    avatarUrl:string,
    gender?:number,
    city?:string,
    country?:string,
    province?:string,
    sceneId?:number,
    pathId?:number,
    platform?:string,
    inviteUids?:string
}
export interface I_roomInfo {
    roomId:number,
    roomIp:string
}
export interface I_item {
    id?:number,
    num: number,
    level?:number,
    countEndTime?:number
}
export interface I_assetInfo {
    items:Dic<I_item>,
    rankScore:number
}
export interface I_inviteReward {
    inviteUids:number[],
    getRewardIndexs:number[]
}