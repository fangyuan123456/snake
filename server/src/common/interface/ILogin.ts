export interface I_loginReq{
    code?:string,
    platform:string,
    isCeShi?:boolean,
    sceneId?:number,
    pathId?:number,
    inviteUid?:number
}
export interface I_sdkLoginRes{
    openId:string,
}