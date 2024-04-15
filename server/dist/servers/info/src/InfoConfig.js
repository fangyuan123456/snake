"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bundleInfoKeyCfg = exports.e_InfoBundle = exports.DataConfig = void 0;
exports.DataConfig = {
    offLineCleanTime: 600,
    unLoginCleanTime: 60
};
var e_InfoBundle;
(function (e_InfoBundle) {
    e_InfoBundle["getRoleInfo"] = "getRoleInfo";
    e_InfoBundle["getAssetInfo"] = "getAssetInfo";
    e_InfoBundle["getInviteRewardInfo"] = "getInviteRewardInfo";
    e_InfoBundle["getScoreInfo"] = "getScoreInfo";
})(e_InfoBundle || (exports.e_InfoBundle = e_InfoBundle = {}));
exports.bundleInfoKeyCfg = {
    [e_InfoBundle.getRoleInfo]: ["uid", "openId", "nickName", "avatarUrl", "gender", "city", "country", "province"],
    [e_InfoBundle.getAssetInfo]: ["items"],
    [e_InfoBundle.getInviteRewardInfo]: ["inviteUids", "getRewardIndex"],
    [e_InfoBundle.getScoreInfo]: ["rankScore", "score"]
};
