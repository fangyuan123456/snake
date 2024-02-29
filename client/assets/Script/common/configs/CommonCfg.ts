export enum pushMsgType{
    KICK_ROOM = 1,
}
export let define = {
    frameDt:0.1,
    frameCanPlayOffset : 20
}
export let chatKuaiJie:string[]=[
    "小心，我要发招了！",
    "小伙，玩的不错哟",
    "我要消除四行啦！",
    "稳住，不慌！",
    "好消，再来一次！",
    "你是GG还是MM！",
    "不要走，下局接着来！"
]
export let rankLevelCfg = [
    {
        score:0,name:"青铜",
    },
    {
        score:500,name:"白银",
    },
    {
        score:1000,name:"黄金",
    },
    {
        score:2000,name:"白金",
    },
    {
        score:5000,name:"钻石",
    }
]
export enum ITEM_ID{
    COINS = 1,
    DIAMOND = 2
}