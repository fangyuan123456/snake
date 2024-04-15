"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bundleInfoKeyCfg = exports.e_InfoBundle = exports.GameConfig = void 0;
exports.GameConfig = {
    frameDt: 100
};
var e_InfoBundle;
(function (e_InfoBundle) {
    e_InfoBundle["gameRoleInfo"] = "gameRoleInfo";
})(e_InfoBundle || (exports.e_InfoBundle = e_InfoBundle = {}));
exports.bundleInfoKeyCfg = {
    [e_InfoBundle.gameRoleInfo]: ["uid", "nickName", "rankScore"],
};
