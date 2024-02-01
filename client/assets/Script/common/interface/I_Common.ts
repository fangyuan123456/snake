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
