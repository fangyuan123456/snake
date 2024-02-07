export enum ROOM_TYPE{
    FRIEND,
    FIGHT
}
export interface I_roomPlayerInfo{
    uid:number,
    nickName:string,
    avatarUrl:string,
    rankScore:number,
    frames:number[]
}
export interface I_enterRoomRes{
    playerInfos:I_roomPlayerInfo[],
    gameTime:number
}