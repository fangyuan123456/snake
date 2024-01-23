export interface I_loginReq{
    code?:string,
    platform:string,
    isCeShi?:boolean
}
export interface I_sdkLoginRes{
    openId:string,

}