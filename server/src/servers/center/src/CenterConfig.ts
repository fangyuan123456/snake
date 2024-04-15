export enum e_InfoBundle{
    getRoleInfo = "getRoleInfo",
    getAssetInfo = "getAssetInfo",
    getInviteRewardInfo = "getInviteRewardInfo",
}
export let bundleInfoKeyCfg = {
    [e_InfoBundle.getRoleInfo]:["uid","openId","nickName","avatarUrl","gender","city","country","province"],
    [e_InfoBundle.getAssetInfo]:["items"],
    [e_InfoBundle.getInviteRewardInfo]:["inviteUids","getRewardIndex"]
}
