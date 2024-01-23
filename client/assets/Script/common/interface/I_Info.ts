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
export type I_assetInfo = Dic<any>