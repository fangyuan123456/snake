import { Dic } from "./I_Common"

export enum ROOM_TYPE{
    FRIEND,
    FIGHT
}
export interface I_roomPlayerInfo{
    nickName:string,
    avatarUrl:string,
    rankScore:number,
    frames:Dic<number>
}
export interface I_enterRoomRes{
    playerInfos:Dic<I_roomPlayerInfo>,
    gameTime:number,
    serverFrameId:number
}
export interface I_frameMsgRes{
    frameData:Dic<{frames:Dic<number>}>
    serverFrameId:number
}