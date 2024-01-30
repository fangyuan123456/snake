"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigManager = void 0;
const SingleBase_1 = require("../base/SingleBase");
const TableBase_1 = __importDefault(require("../base/TableBase"));
class ConfigManager extends SingleBase_1.SingleBase {
    constructor() {
        super();
        this.tbVar = { "A": 1, "B": 1 };
        this.magicKeyCfg = { Layer: "getLayer" };
        this.tables = {};
    }
    setTbVar(tbVar) {
        for (let i in tbVar) {
            this.tbVar[i] = tbVar[i];
        }
        this.resetTbValueByVar(tbVar);
    }
    resetTbValueByVar(tbVar) {
        for (let i in this.tables) {
            let tbVarKeyList = this.tables[i].tbVarKeyList;
            for (let j in tbVarKeyList) {
                if (tbVar[tbVarKeyList[j]]) {
                    this.tables[i].onVarChange();
                }
            }
        }
    }
    getCfg(tbName, callBack, target) {
        if (!this.tables[tbName]) {
            this.tables[tbName] = new TableBase_1.default(tbName);
        }
        return this.tables[tbName].getData(callBack, target);
    }
    getLayer(key, value, tbName = "userLayer") {
        if (!this.tables[tbName]) {
            this.tables[tbName] = new TableBase_1.default(tbName);
        }
        let data = this.tables[tbName].getDataSync();
        let dataValue = 0;
        let layer = data[key].layer;
        for (let i in layer) {
            if (dataValue >= Number(i)) {
                dataValue = layer[i];
            }
        }
        return dataValue;
    }
}
exports.ConfigManager = ConfigManager;
