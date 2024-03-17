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
exports.PlatformManager = void 0;
const SingleBase_1 = require("../base/SingleBase");
const path = __importStar(require("path"));
class PlatformManager extends SingleBase_1.SingleBase {
    constructor() {
        super();
        this.platformApiMap = {};
    }
    getPlatformApi(platform) {
        let api = this.platformApiMap[platform];
        if (!api) {
            let fileName = path.join(__dirname, "../platform/" + platform + "/platformApi.js");
            let handler = null;
            try {
                handler = require(fileName).platformApi;
            }
            catch (_a) {
                fileName = path.join(__dirname, "../platform/PlatformApiBase.js");
                handler = require(fileName).PlatformApiBase;
            }
            api = new handler();
            this.platformApiMap[platform] = api;
        }
        return api;
    }
    getLoginCode(data, callBack) {
        if (data.isCeShi) {
            if (callBack) {
                callBack({
                    openId: data.code
                });
            }
        }
        else {
            this.getPlatformApi(data.platform).getLoginCode(data, callBack);
        }
    }
}
exports.PlatformManager = PlatformManager;
