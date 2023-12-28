"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfigByEnv = exports.mysqlConfig = void 0;
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
