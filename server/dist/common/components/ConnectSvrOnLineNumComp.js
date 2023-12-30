"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectSvrOnLineNumComp = void 0;
class ConnectSvrOnLineNumComp {
    constructor(connectServerType) {
        this.connectServerType = connectServerType;
        this.minSvr = game.app.serversConfig[this.connectServerType][0];
        this.minSvr.userNum = 0;
        setInterval(this.rpcGetUserNum.bind(this), 500);
    }
    rpcGetUserNum() {
        return __awaiter(this, void 0, void 0, function* () {
            let callNum = 1;
            let callBack = () => {
                callNum--;
                if (callNum == 0) {
                    this.resetMinSvr();
                }
            };
            let svrs = game.app.getServersByType(this.connectServerType);
            for (let one of svrs) {
                callNum++;
                one.userNum = yield game.app.rpc(one.id).center.main.getClientNum();
            }
            callBack();
        });
    }
    resetMinSvr() {
        let svrs = game.app.getServersByType(this.connectServerType);
        let minSvr = svrs[0];
        if (!minSvr) {
            return;
        }
        minSvr.userNum = minSvr.userNum || 0;
        for (let one of svrs) {
            one.userNum = one.userNum || 0;
            if (one.userNum < minSvr.userNum) {
                minSvr = one;
            }
        }
        this.minSvr = minSvr;
    }
    getMinSvrIp() {
        return this.minSvr.host + ":" + this.minSvr.clientPort;
    }
}
exports.ConnectSvrOnLineNumComp = ConnectSvrOnLineNumComp;
