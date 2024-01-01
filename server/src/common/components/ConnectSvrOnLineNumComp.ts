import {ServerInfo } from "mydog";
import { serverType } from "../config/GameCfg";
export class ConnectSvrOnLineNumComp{
    minSvr: ServerInfo;
    connectServerType:serverType
    constructor(connectServerType:serverType){
        this.connectServerType = connectServerType;
        this.minSvr = game.app.serversConfig[this.connectServerType][0];
        this.minSvr.userNum = 0;
        setInterval(this.rpcGetUserNum.bind(this), 500);
    }
    private rpcGetUserNum() {
        let callNum = 1;
        let callBack = ()=>{
            callNum--;
            if(callNum == 0){
                this.resetMinSvr();
            }
        }
        let svrs = game.app.getServersByType(this.connectServerType);
        for (let one of svrs) {
            callNum++;
            //@ts-ignore
            game.app.rpc(one.id)[this.connectServerType].main.getClientNum(function (err, num) {
                if (err) {
                    callBack();
                    return;
                }
                one.userNum = num;
                callBack();
            });
        }
        callBack();
    }

    private resetMinSvr() {
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
    getMinSvrIp(){
        return this.minSvr.host+":"+this.minSvr.clientPort
    }
}