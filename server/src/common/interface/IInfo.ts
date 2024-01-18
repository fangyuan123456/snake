export interface I_roleMem {
    "roomId": number,        // 场景序号（主图序号即地图id，副本序号则是从1000开始的）
    "roomIp": string,           // token
}
export interface I_roleInfo {
    "uid": number,              // uid
    "nickname": string,         // 昵称
    "gold": number,             // 金币
    "level": number,            // 等级
    "exp": number,              // 经验值
    "isDelete": number,         // 角色是否被删除
}
export interface I_item {
    num: number,
    level?:number,
    countEndTime?:number
}