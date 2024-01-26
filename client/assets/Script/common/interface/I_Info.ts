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
    num: number,
    level?:number,
    countEndTime?:number
}
export interface I_assetInfo {
    money:number,
    diamond: number,         // 昵称
    items:Dic<I_item>,
}
export interface I_inviteReward {
    inviteUids:number[],
    getRewardIndexs:number[]
}