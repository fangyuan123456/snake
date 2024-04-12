export interface I_rankItemInfo{
    uid:number,
    nickName:string,
    avatarUrl:string,
    score:number
}
export interface I_rankInfo{
    type:string,
    playerData:I_rankItemInfo[]
}