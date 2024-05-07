"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfigByEnv = exports.pushMsgType = exports.ITEM_ID = exports.mysqlConfig = exports.KICKUSER_TYPE = void 0;
var KICKUSER_TYPE;
(function (KICKUSER_TYPE) {
    KICKUSER_TYPE[KICKUSER_TYPE["REMOTE_LOGININ"] = 1] = "REMOTE_LOGININ";
})(KICKUSER_TYPE || (exports.KICKUSER_TYPE = KICKUSER_TYPE = {}));
exports.mysqlConfig = {
    "development": {
        "host": "127.0.0.1",
        "port": 3306,
        "user": "root",
        "password": "fangyuan123.",
        "database": "db_fangkuai",
        "connectionLimit": 5,
    },
    "production": {}
};
var ITEM_ID;
(function (ITEM_ID) {
    ITEM_ID[ITEM_ID["COINS"] = 1] = "COINS";
    ITEM_ID[ITEM_ID["DIAMOND"] = 2] = "DIAMOND";
})(ITEM_ID || (exports.ITEM_ID = ITEM_ID = {}));
var pushMsgType;
(function (pushMsgType) {
    pushMsgType[pushMsgType["KICK_ROOM"] = 1] = "KICK_ROOM";
})(pushMsgType || (exports.pushMsgType = pushMsgType = {}));
/** 根据环境获取配置 */
function getConfigByEnv(config) {
    if (config[game.app.env] === undefined) {
        return config["development"];
    }
    else {
        return config[game.app.env];
    }
}
exports.getConfigByEnv = getConfigByEnv;
