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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UdpSocketServer = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const ICommon_1 = require("../interface/ICommon");
const UdpSession_1 = require("./UdpSession");
const dgram_1 = __importDefault(require("dgram"));
class UdpSocketServer {
    constructor() {
        this.moudles = {};
        this.sessionList = {};
        this.loadMoudles();
        this.createServer();
    }
    createServer() {
        this.udpServer = dgram_1.default.createSocket("udp4");
        let port = game.app.serverInfo.clientPort + 1;
        this.udpServer.bind(port, () => {
            game.logMgr.debug("udp server listening on port ${port}");
        });
        this.udpServer.on("message", this.onMessage.bind(this));
    }
    onMessage(data, rinfo) {
        let dataObj = game.protoMgr.decodeMsg(data);
        let session;
        if (dataObj.msgType == ICommon_1.MSG_TYPE.handshake) {
            this.sessionList[dataObj.msgData.uid] = new UdpSession_1.UdpSession(dataObj.msgData.uid, rinfo.address + ":" + rinfo.port);
            session = this.sessionList[dataObj.msgData.uid];
            session.send({ msgType: ICommon_1.MSG_TYPE.handshake, msgData: {} });
        }
        else {
            session = this.sessionList[dataObj.msgData.uid];
            let cmd = data.readUInt16BE(5);
            let route = game.app.routeConfig[cmd];
            let strArr = route.split(".");
            let handlerName = strArr[strArr.length - 1];
            let fileName = strArr[1];
            if (this.moudles[fileName][handlerName]) {
                this.moudles[fileName][handlerName](dataObj.msgData, session, (callData) => {
                    session.send({ msgHead: dataObj.msgHead, msgData: callData });
                });
            }
            else {
                game.logMgr.error("funcName:%s is not exits", handlerName);
            }
        }
    }
    loadMoudles() {
        let moduleDir = path.join(game.utilsMgr.getAppPath(), "net/HttpHandler");
        let exists = fs.existsSync(moduleDir);
        if (exists) {
            fs.readdirSync(moduleDir).forEach((filename) => {
                if (!filename.endsWith(".js")) {
                    return;
                }
                let name = path.basename(filename, '.js');
                let handler = require(path.join(moduleDir, filename));
                if (handler.default) {
                    this.moudles[name] = new handler.default();
                }
            });
        }
    }
    getSession(uid) {
        return this.sessionList[uid];
    }
    send(msg, ip) {
        let buffer = game.protoMgr.encodeMsg(msg);
        let ipArr = ip.split(":");
        let address = ipArr[0];
        let port = Number(ipArr[1]);
        this.udpServer.send(buffer, 0, buffer.length, port, address, (err) => {
            if (err) {
                game.logMgr.error("error sending response:", err);
            }
            else {
                game.logMgr.debug("resonse send to client:");
            }
        });
    }
}
exports.UdpSocketServer = UdpSocketServer;
