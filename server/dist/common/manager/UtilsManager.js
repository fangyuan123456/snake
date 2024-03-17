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
exports.UtilsManager = void 0;
const SingleBase_1 = require("../base/SingleBase");
const path = __importStar(require("path"));
class UtilsManager extends SingleBase_1.SingleBase {
    getSid(uid, serverType) {
        let infoArr = game.app.serversConfig[serverType];
        return infoArr[uid % infoArr.length].id;
    }
    getServerByUid(uid, serverType) {
        let sid = this.getSid(uid, serverType);
        let server = game.app.getServerById(sid);
        return server;
    }
    getServerIp(server) {
        return server.host + ":" + server.clientPort;
    }
    getCharLen(charCode) {
        if (charCode >= 48 && charCode <= 57) { // 0-9
            return 1;
        }
        if (charCode >= 65 && charCode <= 90) { // A-Z
            return 1;
        }
        if (charCode >= 97 && charCode <= 122) { // a-z
            return 1;
        }
        return 2;
    }
    getAppPath() {
        return path.join(__dirname, "../../servers/" + game.app.serverType);
    }
    capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    merge(map, newMap) {
        for (let i in newMap) {
            map[i] = newMap[i];
        }
        return map;
    }
    deepCopy(obj) {
        if (typeof obj !== 'object' || obj === null) {
            return obj;
        }
        let copy;
        if (Array.isArray(obj)) {
            copy = [];
            for (let i = 0; i < obj.length; i++) {
                copy[i] = this.deepCopy(obj[i]);
            }
        }
        else {
            copy = {};
            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    //@ts-ignore
                    copy[key] = this.deepCopy(obj[key]);
                }
            }
        }
        return copy;
    }
    comporeVersion(versionStr1, versionStr2) {
        let versionList1 = versionStr1.split(".");
        let versionList2 = versionStr2.split(".");
        for (let i = 0; i < versionList1.length; i++) {
            if (versionList1[i] < versionList2[i]) {
                return true;
            }
        }
        return false;
    }
}
exports.UtilsManager = UtilsManager;
