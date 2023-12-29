export interface I_loginReq{
    code:string,
    platform:string,
    isTest:boolean
}
export interface I_sdkLoginRes{
    openid:string,

}
export interface I_loginRes{
    centerIp:string,
    uid:number,
    nickName:string,

}