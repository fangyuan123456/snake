export interface Dic<T> {
    [key: string]: T
}
export enum MSG_TYPE{
    msg = 1,
    handshake,
    heartbeat
}
export interface I_msg{
    msgHead?:string,
    msgType?:MSG_TYPE,
    msgData:any
}
export interface I_playerAllInfo{
    uid: number,              // uid
    openId:string,
    nickName: string,         // 昵称
    avatarUrl:string,
    gender?:number,
    city?:string,
    country?:string,
    province?:string
}