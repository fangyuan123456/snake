"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqlUpdateBase = void 0;
class SqlUpdateBase {
    constructor(tb_name) {
        this.tb_name = "";
        this.whileUpdateKeyList = {};
        this.tb_name = tb_name;
    }
    updateSqlValue(data) {
        for (let i in data) {
            this.whileUpdateKeyList[data[i].key] = data[i].value;
        }
    }
    doSqlUpdate(cond) {
        if (Object.keys(this.whileUpdateKeyList).length > 0) {
            game.sqlMgr.update(this.tb_name, this.whileUpdateKeyList, cond);
            this.whileUpdateKeyList = {};
        }
    }
}
exports.SqlUpdateBase = SqlUpdateBase;
