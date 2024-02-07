export enum e_roomType{
    FRIEND = 1,
    FIGHT = 2
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