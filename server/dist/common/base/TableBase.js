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
class TableBase {
    constructor(tbName) {
        this.getCfgCallBackList = [];
        this.tbVarKeyList = [];
        this.varCond = {};
        this.tbName = tbName;
    }
    setOrginData() {
        let jsonData = require("../config/tables/" + this.tbName);
        this.orginData = jsonData;
        this.varCond = this.orginData["var"];
        this.setTbVarKeyList();
        delete this.orginData["var"];
        this.setData();
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
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
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
                        let newStr = matchStr.replace(i, "game.configMgr." + game.configMgr.magicKeyCfg[i]);
                        let evalData = yield eval(newStr);
                        str = str.replace(matchStr, evalData + "");
                    }
                }
            }
            resolve(eval(str));
        }));
    }
    setData() {
        return __awaiter(this, void 0, void 0, function* () {
            this.data = {};
            for (let i in this.orginData) {
                this.data[i] = game.utilsMgr.deepCopy(this.orginData[i]);
                for (let key in this.varCond) {
                    let data = this.data[i][key];
                    if (typeof data == 'object') {
                        for (let j in data) {
                            this.data[i][key][j] = yield this.resplceVar(data[j], this.varCond[key]);
                        }
                    }
                    else {
                        this.data[i][key] = yield this.resplceVar(data, this.varCond[key]);
                    }
                }
            }
            this.callGetCfgFunc();
        });
    }
    callGetCfgFunc() {
        let data = this.data;
        if (data) {
            for (let i = this.getCfgCallBackList.length - 1; i >= 0; i--) {
                let target = this.getCfgCallBackList[i].target;
                let callBack = this.getCfgCallBackList[i].callBack;
                if (!target || (target && target.node && target.node.parent)) {
                    callBack(data);
                }
                else {
                    this.getCfgCallBackList.splice(i, 1);
                }
            }
        }
    }
    getData(callBack, target) {
        this.getCfgCallBackList.push({
            target: target,
            callBack: callBack
        });
        this.callGetCfgFunc();
        if (!this.orginData) {
            this.setOrginData();
        }
    }
}
exports.default = TableBase;
