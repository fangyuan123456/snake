export interface I_roleMem {
    "roomSvrId": string,          // svr
    "roomId": number,        // 场景序号（主图序号即地图id，副本序号则是从1000开始的）
    "token": number,           // token
}
export interface I_roleInfo {
    "uid": number,              // uid
    "nickname": string,         // 昵称
    "gold": number,             // 金币
    "level": number,            // 等级
    "exp": number,              // 经验值
    "isDelete": number,         // 角色是否被删除
}
export interface I_equipment {
    "weapon": I_item,           // 武器
}
export interface I_bagItem {
    item:I_item,
    index:number
}
export interface I_item {
    id: number,
    num: number,
    level?:number
}
export const enum E_itemT {
    gold = 0,               // 金币
    weapon = 1,             // 武器栏
    armor_physical = 2,    // 物抗栏
    armor_magic = 3,        // 魔抗栏
    hp_add = 4,     // 加血上限栏
    mp_add = 5,     // 加魔上限栏
    hp = 6,         // 快速加血栏
    mp = 7,         // 快速加蓝栏
}