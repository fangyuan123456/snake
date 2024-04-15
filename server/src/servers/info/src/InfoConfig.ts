export let DataConfig = {
    offLineCleanTime :  600,
    unLoginCleanTime:60
}
export enum e_InfoBundle{
    getRoleInfo = "getRoleInfo",
    getAssetInfo = "getAssetInfo",
    getInviteRewardInfo = "getInviteRewardInfo",
    getScoreInfo = "getScoreInfo"
}
export let bundleInfoKeyCfg = {
    [e_InfoBundle.getRoleInfo]:["uid","openId","nickName","avatarUrl","gender","city","country","province"],
    [e_InfoBundle.getAssetInfo]:["items"],
    [e_InfoBundle.getInviteRewardInfo]:["inviteUids","getRewardIndex"],
    [e_InfoBundle.getScoreInfo]:["rankScore","score"]
}
