export interface Dic<T> {
    [key: string]: T
}
export enum MSG_TYPE{
    msg = 1,
    handshake,
    heartbeat
}
export enum e_bundleName{
    game = "game"
}
export interface I_msg{
    msgHead?:string,
    msgType?:MSG_TYPE,
    msgData?:any
}
export interface I_LoadCfg{
    funcName:string,
    progressNum:number,
    time:number,
    title:string
}