"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogManager = void 0;
const SingleBase_1 = require("../base/SingleBase");
const log4js = __importStar(require("log4js"));
let logLevel = {
    "production": "info",
};
let config = {
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
class LogManager extends SingleBase_1.SingleBase {
    constructor() {
        super();
        this.gameLog = log4js.getLogger("gameLog");
        this.replaceServerId();
    }
    // 替换文件名的服务器id
    replaceServerId() {
        for (let x in config.appenders) {
            let one = config.appenders[x];
            if (one.filename) {
                one.filename = one.filename.replace("serverId", game.app.serverId);
            }
        }
        let level = logLevel[game.app.env] || "all";
        for (let x in config.categories) {
            config.categories[x].level = level;
        }
        log4js.configure(config);
    }
    debug(message, ...args) {
        this.gameLog.debug(message, ...args);
        console.log(message, ...args);
    }
    ;
    info(message, ...args) {
        this.gameLog.info(message, ...args);
    }
    ;
    warn(message, ...args) {
        this.gameLog.warn(message, ...args);
        console.warn(message, ...args);
    }
    ;
    error(message, ...args) {
        this.gameLog.error(message, ...args);
        console.error(message, ...args);
    }
    ;
}
exports.LogManager = LogManager;
