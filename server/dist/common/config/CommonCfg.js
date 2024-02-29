"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfigByEnv = exports.pushMsgType = exports.ITEM_ID = exports.mysqlConfig = void 0;
exports.mysqlConfig = {
    "development": {
        "host": "120.76.217.84",
        "port": 3306,
        "user": "root",
        "password": "fangyuan123.",
        "database": "db_snake",
        "connectionLimit": 5,
    },
    "production": {}
};
var ITEM_ID;
(function (ITEM_ID) {
    ITEM_ID[ITEM_ID["COINS"] = 1] = "COINS";
    ITEM_ID[ITEM_ID["DIAMOND"] = 2] = "DIAMOND";
})(ITEM_ID = exports.ITEM_ID || (exports.ITEM_ID = {}));
var pushMsgType;
(function (pushMsgType) {
    pushMsgType[pushMsgType["KICK_ROOM"] = 1] = "KICK_ROOM";
})(pushMsgType = exports.pushMsgType || (exports.pushMsgType = {}));
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
