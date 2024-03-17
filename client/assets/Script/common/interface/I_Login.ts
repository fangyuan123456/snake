export interface I_loginReq{
    code?:string,
    platform:string,
    isCeShi?:boolean,
    sceneId?:number,
    pathId?:number,
    inviteUid?:number
}
export interface I_loginRes{
    centerIp?:string
    isOpenShare:boolean
    playerInfo:{
        uid: number,              // uid
        openId:string,
        nickName: string,         // 昵称
        avatarUrl:string,
        gender?:number,
        city?:string,
        country?:string,
        province?:string,
    }
    isSheHeState:boolean,
}


