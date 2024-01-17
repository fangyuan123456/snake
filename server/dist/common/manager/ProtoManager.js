"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProtoManager = void 0;
const SingleBase_1 = require("../base/SingleBase");
const protobufjs_1 = require("protobufjs");
class ProtoManager extends SingleBase_1.SingleBase {
    constructor() {
        super();
        this.root = null;
        this.encodeDecodeFuncMap = {};
    }
    getEncodeDecodeFunc(pbName) {
        if (!this.encodeDecodeFuncMap[pbName]) {
            if (!this.root) {
                this.root = (0, protobufjs_1.loadSync)(__dirname + "/../proto/" + game.app.serverType + ".json");
            }
            this.encodeDecodeFuncMap[pbName] = this.root.lookupType(pbName);
        }
        return this.encodeDecodeFuncMap[pbName];
    }
    decode(cmd, msg) {
        let routeUrl = game.app.routeConfig[cmd];
        let strArr = routeUrl.split(".");
        let funcName = strArr[strArr.length - 1];
        let pbName = game.app.serverType + "." + funcName + "Req";
        return this.getEncodeDecodeFunc(pbName).decode(msg);
    }
    encode(cmd, msg) {
        let routeUrl = game.app.routeConfig[cmd];
        let strArr = routeUrl.split(".");
        let funcName = strArr[strArr.length - 1];
        let pbName = game.app.serverType + "." + funcName + "Res";
        let decoder = this.getEncodeDecodeFunc(pbName);
        let message = decoder.create(msg);
        let buffer = decoder.encode(message).finish();
        return Buffer.from(buffer);
    }
}
exports.ProtoManager = ProtoManager;
