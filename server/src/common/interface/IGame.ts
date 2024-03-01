import { Dic } from "./ICommon"

export enum e_roomType{
    FRIEND = 1,
    FIGHT = 2
}
export interface I_roomPlayerInfo{
    nickName:string,
    avatarUrl:string,
    rankScore:number,
    frames:number[]
}
export interface I_enterRoomRes{
    playerInfos:Dic<I_roomPlayerInfo>,
    gameTime:number,
    serverFrameId:number
}
export interface I_frameMsgRes{
    frameData:Dic<{frames:number[]}>,
    serverFrameId:number
}