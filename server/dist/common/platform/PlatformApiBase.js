"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlatformApiBase = void 0;
class PlatformApiBase {
    constructor() {
    }
    getLoginCode(data, callBack) {
        if (callBack) {
            callBack({
                openid: data.code
            });
        }
    }
}
exports.PlatformApiBase = PlatformApiBase;
