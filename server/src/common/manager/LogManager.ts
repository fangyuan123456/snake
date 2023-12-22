import { SingleBase } from "../base/SingleBase";
import * as log4js from "log4js"
import { Application } from "mydog";

let logLevel: { [key: string]: string } = {
    "production": "info",
}

let config: log4js.Configuration = {
    appenders: {
        gameLog: {
            type: 'file',
            filename: './log/gameLog_serverId.log',
            maxLogSize: 10 * 1024 * 1024,
            backups: 5
        },
        out: {
            type: 'stdout'
        }
    },
    categories: {
        default: { appenders: ['out'], level: 'all' },
        gameLog: { appenders: ['out', "gameLog"], level: 'all' }
    }
};
/**
 * 游戏日志
 */
export class LogManager extends SingleBase{
    gameLog:log4js.Logger
    constructor(){
        super();
        this.gameLog = log4js.getLogger("gameLog");
        this.replaceServerId();
    }
    // 替换文件名的服务器id
    replaceServerId() {
        for (let x in config.appenders) {
            let one: any = config.appenders[x];
            if (one.filename) {
                one.filename = (one.filename as string).replace("serverId", game.app.serverId);
            }
        }
        let level = logLevel[game.app.env] || "all";
        for (let x in config.categories) {
            config.categories[x].level = level;
        }
        log4js.configure(config);
    }

    debug(message: any, ...args: any[]){
        this.gameLog.debug(message,...args);
    };
  
    info(message: any, ...args: any[]){
        this.gameLog.info(message,...args);
    };
  
    warn(message: any, ...args: any[]){
        this.gameLog.warn(message,...args);
    };
  
    error(message: any, ...args: any[]){
        this.gameLog.error(message,...args);
    };
}