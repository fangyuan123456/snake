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
exports.GameServerBase = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const mydog_1 = require("mydog");
const LogManager_1 = require("../manager/LogManager");
const UtilsManager_1 = require("../manager/UtilsManager");
const ProtoManager_1 = require("../manager/ProtoManager");
const HttpManager_1 = require("../manager/HttpManager");
const TimeManager_1 = require("../manager/TimeManager");
const PlatformManager_1 = require("../manager/PlatformManager");
const SqlManager_1 = require("../manager/SqlManager");
const EventManager_1 = require("../manager/EventManager");
const ConfigManager_1 = require("../manager/ConfigManager");
class GameServerBase {
    constructor(app) {
        this.clientNum = 0;
        this.cpuUsage = "";
        this.app = app;
        globalThis.game = this;
        this.logMgr = LogManager_1.LogManager.getInstance();
        this.utilsMgr = UtilsManager_1.UtilsManager.getInstance();
        this.protoMgr = ProtoManager_1.ProtoManager.getInstance();
        this.timeMgr = TimeManager_1.TimeManager.getInstance();
        this.platformMgr = PlatformManager_1.PlatformManager.getInstance();
        this.eventMgr = EventManager_1.EventManager.getInstance();
        this.sqlMgr = SqlManager_1.SqlManager.getInstance();
        this.configMgr = ConfigManager_1.ConfigManager.getInstance();
        this.uncaughtException();
        this.initCupUsage();
        this.setConfig();
        this.app.start();
        if (this.app.serverInfo.HttpPort) {
            this.httpMgr = HttpManager_1.HttpManager.getInstance();
        }
    }
    getCert() {
        if (this.app.env === "production") {
            return {
                key: fs.readFileSync(path.join(this.utilsMgr.getAppPath(), "../www.mydog.wiki.key")),
                cert: fs.readFileSync(path.join(this.utilsMgr.getAppPath(), "../www.mydog.wiki.key"))
            };
        }
        else {
            return {
                key: "",
                cert: ""
            };
        }
    }
    setConfig() {
        let cert = this.getCert();
        this.app.setConfig("mydogList", this.mydogList);
        this.app.setConfig("connector", {
            "connector": mydog_1.connector.Ws,
            "clientOnCb": this.onUserIn,
            "clientOffCb": this.onUserLeave,
            "interval": 50,
            "noDelay": false,
            "ssl": this.app.env === "production",
            "key": cert.key,
            "cert": cert.cert,
            "heartbeat": 10000
        });
        this.app.setConfig("rpc", { "interval": 30, "noDelay": false });
        this.app.setConfig("encodeDecode", { "msgDecode": this.protoMgr.decode.bind(this.protoMgr), "msgEncode": this.protoMgr.encode.bind(this.protoMgr) });
        this.app.setConfig("logger", (level, info) => {
            if (level !== "debug") {
                this.logMgr[level](info);
            }
        });
    }
    mydogList() {
        let onlineNum = "--";
        if (this.app.serverInfo.clientPort) {
            onlineNum = this.app.clientNum.toString();
        }
        return [
            { "title": "cpu(%)", "value": this.cpuUsage },
            { "title": "onlineNum", "value": onlineNum },
        ];
    }
    initCupUsage() {
        let last = process.cpuUsage();
        setInterval(() => {
            let diff = process.cpuUsage(last);
            last = process.cpuUsage();
            this.cpuUsage = ((diff.user + diff.system) / (5000 * 1000) * 100).toFixed(1);
        }, 5000);
    }
    onUserIn(session) {
    }
    onUserLeave(session) {
    }
    uncaughtException() {
        process.on("uncaughtException", function (err) {
            game.logMgr.error(err);
        });
    }
    sendMsg(uid, data, frontServer = "center" /* serverType.center */) {
        let cmd = game.protoMgr.getProtoCode(data.msgHead);
        if (cmd || cmd == 0) {
            let sid = game.utilsMgr.getSid(uid, frontServer);
            this.app.sendMsgByUidSid(cmd, data.msgData, [{ uid: uid, sid: sid }]);
        }
        else {
            game.logMgr.error("msgHead:%s is not find", data.msgHead);
        }
    }
}
exports.GameServerBase = GameServerBase;
