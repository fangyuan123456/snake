"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProtoManager = void 0;
const SingleBase_1 = require("../base/SingleBase");
const protobufjs_1 = require("protobufjs");
const ICommon_1 = require("../interface/ICommon");
class ProtoManager extends SingleBase_1.SingleBase {
    constructor() {
        super();
        this.rootMap = {};
        this.encodeDecodeFuncMap = {};
    }
    getEncodeDecodeFunc(pbName) {
        if (!this.encodeDecodeFuncMap[pbName]) {
            let serverName = pbName.split(".")[0];
            let root = this.rootMap[serverName];
            if (!root) {
                root = (0, protobufjs_1.loadSync)(__dirname + "/../proto/" + serverName + ".json");
                this.rootMap[serverName] = root;
            }
            this.encodeDecodeFuncMap[pbName] = root.lookupType(pbName);
        }
        return this.encodeDecodeFuncMap[pbName];
    }
    getProtoCode(pbName) {
        let routeConfig = game.app.routeConfig;
        for (let i in routeConfig) {
            let str = routeConfig[i];
            if (str.endsWith("." + pbName)) {
                return Number(i);
            }
        }
    }
    getServerName(cmd) {
        let routeUrl = game.app.routeConfig[cmd];
        let strArr = routeUrl.split(".");
        // @ts-ignore
        return strArr[0];
    }
    decode(cmd, msg) {
        let routeUrl = game.app.routeConfig[cmd];
        let strArr = routeUrl.split(".");
        let funcName = strArr[strArr.length - 1];
        let pbName = strArr[0] + "." + funcName + "Req";
        return this.getEncodeDecodeFunc(pbName).decode(msg);
    }
    encode(cmd, msg) {
        game.logMgr.debug("cmd:%d,msg:%s", cmd, JSON.stringify(msg));
        let routeUrl = game.app.routeConfig[cmd];
        let strArr = routeUrl.split(".");
        let funcName = strArr[strArr.length - 1];
        let pbName = strArr[0] + "." + funcName + "Res";
        let decoder = this.getEncodeDecodeFunc(pbName);
        let message = decoder.create(msg);
        let buffer = decoder.encode(message).finish();
        return Buffer.from(buffer);
    }
    decodeMsg(data) {
        let msgLen = data.readUInt32BE(0);
        let msgHead = "";
        let msgData = null;
        let type = data.readUint8(4);
        if (type == ICommon_1.MSG_TYPE.handshake) {
            msgData = JSON.parse(data.slice(5).toString());
        }
        else if (type == ICommon_1.MSG_TYPE.msg) {
            let cmd = data.readUInt16BE(5);
            let routeUrl = game.app.routeConfig[cmd];
            let strArr = routeUrl.split(".");
            msgHead = strArr[strArr.length - 1];
            msgData = game.protoMgr.decode(cmd, data.slice(7));
        }
        let msg = {
            msgHead: "msgHead",
            msgType: type,
            msgData: msgData
        };
        return msg;
    }
    encodeMsg(msg) {
        let dataBuffer = null;
        let msgBuffer = null;
        let len = 5;
        if (msg.msgType == ICommon_1.MSG_TYPE.handshake) {
            dataBuffer = Buffer.from(msg.msgData);
            len += dataBuffer.length;
            msgBuffer = Buffer.alloc(len);
            msgBuffer.writeUint32BE(len, 0);
            msgBuffer.writeUint8(msg.msgType, 4);
            msgBuffer.copy(dataBuffer, 5);
        }
        else {
            let msgHead = msg.msgHead;
            let cmd = this.getProtoCode(msgHead);
            dataBuffer = this.encode(cmd, msg.msgData);
            len += (dataBuffer.length + 2);
            msgBuffer = Buffer.alloc(len);
            msgBuffer.writeUInt32BE(len, 0);
            msgBuffer.writeUint8(msg.msgType, 4);
            msgBuffer.writeUint16BE(cmd, 5);
            msgBuffer.copy(dataBuffer, 7);
        }
        return msgBuffer;
    }
}
exports.ProtoManager = ProtoManager;
