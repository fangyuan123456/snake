"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectSvrOnLineNumComp = void 0;
class ConnectSvrOnLineNumComp {
    constructor(connectServerType) {
        this.connectServerType = connectServerType;
        this.minSvr = game.app.serversConfig[this.connectServerType][0];
        this.minSvr.userNum = 0;
        setInterval(this.rpcGetUserNum.bind(this), 5000);
    }
    rpcGetUserNum() {
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
            //@ts-ignore
            game.app.rpc(one.id)[this.connectServerType].main.getClientNum().then((num) => {
                one.userNum = num;
                callBack();
            });
        }
        callBack();
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
