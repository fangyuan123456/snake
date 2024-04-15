export let LoginCfg={
 
} 
export enum e_InfoBundle{
    getRoleInfo = "getRoleInfo",
}
export let bundleInfoKeyCfg = {
    [e_InfoBundle.getRoleInfo]:["uid","openId","nickName","avatarUrl","gender","city","country","province"]
}