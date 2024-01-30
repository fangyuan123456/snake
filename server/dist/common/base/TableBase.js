"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TableBase {
    constructor(tbName) {
        this.getCfgCallBackList = [];
        this.tbVarKeyList = [];
        this.extableCfgData = {};
        this.varCond = {};
        this.tbName = tbName;
    }
    setOrginData() {
        let jsonData = require("../config/tables/" + this.tbName);
        this.orginData = jsonData;
        if (this.orginData["var"]) {
            this.varCond = this.orginData["var"];
            this.setTbVarKeyList();
            delete this.orginData["var"];
        }
        if (this.orginData["extable"]) {
            for (let i in this.orginData["extable"]) {
                let cfgs = this.orginData["extable"][i];
                for (let j in cfgs) {
                    this.extableCfgData[cfgs[j]] = null;
                }
            }
            delete this.orginData["extable"];
        }
        this.loadAllExTable(() => {
            this.setData();
        });
    }
    loadAllExTable(callBack) {
        if (Object.keys(this.extableCfgData).length > 0) {
            let callEndFunc = () => {
                for (let i in this.extableCfgData) {
                    if (!this.extableCfgData[i]) {
                        return;
                    }
                }
                callBack();
            };
            for (let i in this.extableCfgData) {
                let table = game.configMgr.tables[i];
                if (!table) {
                    table = new TableBase(i);
                    game.configMgr.tables[i] = table;
                }
                table.getData((data) => {
                    this.extableCfgData[i] = data;
                    callEndFunc();
                });
            }
        }
        else {
            callBack();
        }
    }
    setTbVarKeyList() {
        for (let i in this.varCond) {
            for (let j in this.varCond[i]) {
                if (this.tbVarKeyList.indexOf(this.varCond[i][j]) < 0) {
                    this.tbVarKeyList.push(this.varCond[i][j]);
                }
            }
        }
    }
    resplceVar(str, varList) {
        for (let i in varList) {
            if (game.configMgr.tbVar[varList[i]]) {
                str = str.replace(varList[i], game.configMgr.tbVar[varList[i]]);
            }
            else {
                game.logMgr.error("var:%d is not set", game.configMgr.tbVar[varList[i]]);
            }
        }
        for (let i in game.configMgr.magicKeyCfg) {
            const regexString = i + "\\([^()]*\\)";
            const match = str.match(regexString);
            if (match) {
                for (let j = 0; j < match.length; j++) {
                    let matchStr = match[j];
                    let funcStr = matchStr.replace(i, "game.configMgr." + game.configMgr.magicKeyCfg[i]);
                    let evalData = eval(funcStr);
                    str = str.replace(matchStr, evalData + "");
                }
            }
        }
        return eval(str);
    }
    onVarChange() {
        this.setData();
    }
    setData() {
        this.data = {};
        for (let i in this.orginData) {
            this.data[i] = game.utilsMgr.deepCopy(this.orginData[i]);
            for (let key in this.varCond) {
                let data = this.data[i][key];
                if (typeof data == 'object') {
                    for (let j in data) {
                        this.data[i][key][j] = this.resplceVar(data[j], this.varCond[key]);
                    }
                }
                else {
                    this.data[i][key] = this.resplceVar(data, this.varCond[key]);
                }
            }
        }
        this.callGetCfgFunc();
    }
    callGetCfgFunc() {
        let data = this.data;
        if (data) {
            for (let i = this.getCfgCallBackList.length - 1; i >= 0; i--) {
                let target = this.getCfgCallBackList[i].target;
                let callBack = this.getCfgCallBackList[i].callBack;
                if (!target || (target && target.node && target.node.parent)) {
                    callBack(data);
                    if (this.getCfgCallBackList[i].isCallOnce) {
                        this.getCfgCallBackList.splice(i, 1);
                    }
                }
                else {
                    this.getCfgCallBackList.splice(i, 1);
                }
            }
        }
    }
    getDataSync() {
        return this.data;
    }
    getData(callBack, target, isCallOnce) {
        this.getCfgCallBackList.push({
            target: target,
            isCallOnce: isCallOnce,
            callBack: callBack
        });
        this.callGetCfgFunc();
        if (!this.orginData) {
            this.setOrginData();
        }
    }
}
exports.default = TableBase;
