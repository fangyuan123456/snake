export interface I_playerRoomId {
    roomId: number,
    roomIp: string,
}
export interface I_MatchRoleInfo{
    uid:number,
    nickName:string,
    avatarUrl:string,
    rankScore:number
}
export interface I_matchRes{
    roles:I_MatchRoleInfo[]
}