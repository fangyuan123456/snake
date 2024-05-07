import { SingleBase } from "../base/SingleBase";
import { serverType } from "../config/CommonCfg";
import { Dic } from "../interface/ICommon";
export class InfoManager extends SingleBase {
    playerInfo: Dic<Dic<any>> = {};
    constructor() {
        super();
    }
    public onNotifyPlayerInfoUpdate(uid: number, info: Dic<any>) {
        let changeInfo: Dic<any> = {}
        for (let infoKey in info) {
            let data = info[infoKey];
            if (this.playerInfo[uid]) {
                if (this.playerInfo[uid][infoKey] != data) {
                    this.playerInfo[uid][infoKey] = data;
                    changeInfo[infoKey] = data;
                }
            } else {
                changeInfo[infoKey] = data;
            }
        }
        let infos = this.spliceInfoByBundle(changeInfo)
        for (let bundleName in infos) {
            game.eventMgr.dispatch("playerInfoUpdate", { uid: uid, bundleName: bundleName, info: infos[bundleName] })
        }
    }
    public onNotifyCleanPlayerInfo(uid: number) {
        delete this.playerInfo[uid]
    }
    public spliceInfoByBundle(info: Dic<any>) {
        let bundleInfos: Dic<any> = {}
        for (let bundleName in game.bundleInfoKeyCfg) {
            for (let index in game.bundleInfoKeyCfg[bundleName]) {
                let infoKey = game.bundleInfoKeyCfg[bundleName][index];
                if (info[infoKey]) {
                    bundleInfos[bundleName] = bundleInfos[bundleName] || {};
                    bundleInfos[bundleName][infoKey] = info[infoKey];
                }
            }
        }
        return bundleInfos;
    }
    private getInfoServer(uid: number) {
        if (game.app.serverType == serverType.info) {
            return infoGame
        } else {
            return game.app.rpc(game.utilsMgr.getSid(uid, serverType.info)).info.main
        }
    }
    async getPlayerInfo(uid: number) {
        if (game.app.serverType == serverType.info) {
            return infoGame.getPlayerInfo(uid);
        } else {
            let info = this.playerInfo[uid];
            if (!info) {
                info = await this.getInfoServer(uid)!.getPlayerInfo(uid, game.getAllBundleInfoKey());
                if (game.getIsNeedCacheInfo()) {
                    this.playerInfo[uid] = info;
                }
            }
            return info;
        }
    }
    async getOnceInfo(uid: number, infoKeyList: string[]) {
        let playerInfo = await this.getInfoServer(uid)!.getOnceInfo(uid, infoKeyList);
        return playerInfo;
    }
    setPlayerInfo(uid: number, info: Dic<any>) {
        if (game.app.serverType == serverType.info) {
            infoGame.setPlayerInfo(uid, info);
        } else {
            if (this.playerInfo[uid]) {
                for (let infoKey in info) {
                    let data = info[infoKey];
                    this.playerInfo[uid][infoKey] = data;
                }
            }
            this.getInfoServer(uid)!.setPlayerInfo(uid, info);
        }
    }
    async changePlayerInfo(uid: number, info: Dic<any>) {
        let orginInfo = await this.getOnceInfo(uid, Object.keys(info));
        let resetInfo: Dic<any> = {}
        for (let i in info) {
            if (typeof orginInfo[i] == "number" && typeof info[i] == "number") {
                orginInfo[i] = orginInfo[i] += info[i];
            } else if (orginInfo[i] instanceof Array) {
                let infoArr = info[i];
                if (!(info[i] instanceof Array)) {
                    infoArr = [info[i]];
                }
                for (let index in infoArr) {
                    let infoData = infoArr[index]
                    if (orginInfo[i].indexOf(infoData) < 0) {
                        orginInfo[i].push(infoData);
                    }
                }
            } else if (orginInfo[i] instanceof Object) {
                let orginData = orginInfo[i];
                for (let key in info[i]) {
                    orginData[key] += info[i][key]
                }
            }
            resetInfo[i] = orginInfo[i];
        }
        this.getInfoServer(uid)!.setPlayerInfo(uid, resetInfo);
    }
    async getInfoByBundle<T>(uid: number, bundleName: string, info?: Dic<any>): Promise<T> {
        info = info || await this.getPlayerInfo(uid);
        let bundleInfoKeyCfg = game.bundleInfoKeyCfg;
        let cfgArr = bundleInfoKeyCfg[bundleName];
        if (!cfgArr) {
            game.logMgr.error("infoBundleName:%s is not cfg", bundleName)
            return {} as T;
        } else {
            let bundleInfo: Dic<any> = {};
            for (let i in cfgArr) {
                bundleInfo[cfgArr[i]] = info[cfgArr[i]]
            }
            return bundleInfo as T;
        }
    }
}