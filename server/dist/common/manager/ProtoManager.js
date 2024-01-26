"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProtoManager = void 0;
const SingleBase_1 = require("../base/SingleBase");
const protobufjs_1 = require("protobufjs");
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
}
exports.ProtoManager = ProtoManager;
