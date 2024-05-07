/** 服务器类型 */
export const enum serverType {
    master = "master",
    login = "login",
    connector = "connector",
    center = "center",
    info = "info",
    match = "match",
    game = "game"
}
export enum KICKUSER_TYPE{
    REMOTE_LOGININ = 1
}
export let mysqlConfig = {
    "development": {
        "host": "127.0.0.1",
        "port": 3306,
        "user": "root",
        "password": "fangyuan123.",
        "database": "db_fangkuai",
        "connectionLimit": 5,
    },
    "production": {

    }
}
export enum ITEM_ID{
    COINS = 1,
    DIAMOND = 2
}
export enum pushMsgType{
    KICK_ROOM = 1,
}
/** 根据环境获取配置 */
export function getConfigByEnv( config: { [env: string]: any }) {
    if (config[game.app.env] === undefined) {
        return config["development"];
    } else {
        return config[game.app.env];
    }
}