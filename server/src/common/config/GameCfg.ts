/** 服务器类型 */
export const enum serverType {
    master = "master",
    login = "login",
    centor = "centor",
    info = "info",
    map = "map",
}
export let mysqlConfig = {
    "development": {
        "host": "127.0.0.1",
        "port": 3306,
        "user": "root",
        "password": "123456",
        "database": "mmo_demo",
        "connectionLimit": 5,
    },
    "production": {

    }
}
/** 根据环境获取配置 */
export function getConfigByEnv( config: { [env: string]: any }) {
    if (config[game.app.env] === undefined) {
        return config["development"];
    } else {
        return config[game.app.env];
    }
}