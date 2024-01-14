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
exports.SqlBase = void 0;
class SqlBase {
    constructor(tb_name, cond) {
        this.compKey = {};
        this.defaultCompKey = null;
        this.cond = null;
        this.whileUpdateKeyList = {};
        this.tb_name = tb_name;
        this.cond = cond;
    }
    init(defaultData) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            let items = yield this.select();
            if (!items) {
                defaultData = defaultData || {};
                items = defaultData;
                this.add(defaultData);
            }
            this.sendDatasCenter(items);
            resolve(items);
        }));
    }
    sendDatasCenter(datasCenter) {
        this.datasCenter = datasCenter;
    }
    getCond() {
        return this.cond;
    }
    isCompKey(sqlKey) {
        if (this.compKey[sqlKey] || sqlKey == this.defaultCompKey) {
            return true;
        }
        return false;
    }
    getCompKey(key) {
        if (!isNaN(Number(key))) {
            return this.defaultCompKey;
        }
        for (let sqlKey in this.compKey) {
            let keyList = this.compKey[key];
            if (keyList.indexOf(key) >= 0) {
                return sqlKey;
            }
        }
        return key;
    }
    getAllDataByCompKey(compKey) {
        let newDic = {};
        if (compKey == this.defaultCompKey) {
            for (let key in this.datasCenter) {
                if (!isNaN(Number(key))) {
                    newDic[key] = this.datasCenter[key];
                }
            }
        }
        else {
            let keyList = this.compKey[compKey];
            for (let key in keyList) {
                newDic[key] = this.datasCenter[key];
            }
        }
        return newDic;
    }
    fullCompKeyData(obj) {
        let fullCompKeyList = [];
        let newDicObj = {};
        for (let i in obj) {
            let compKey = this.getCompKey(i);
            if (compKey) {
                if (fullCompKeyList.indexOf(compKey) < 0) {
                    fullCompKeyList.push(compKey);
                    game.utilsMgr.merge(newDicObj, this.getAllDataByCompKey(compKey));
                }
            }
            else {
                newDicObj[i] = obj[i];
            }
        }
        return newDicObj;
    }
    parseTableKeyDic(dicObj) {
        let newDicObj = {};
        for (let key in dicObj) {
            if (this.isCompKey(key)) {
                let compDicObj = JSON.parse(dicObj[key]);
                for (let newKey in compDicObj) {
                    newDicObj[newKey] = compDicObj[newKey];
                }
            }
            else {
                if (typeof dicObj[key] == "string") {
                    newDicObj[key] = JSON.parse(dicObj[key]);
                }
                else {
                    newDicObj[key] = dicObj[key];
                }
            }
        }
        return newDicObj;
    }
    makeTableKeyDic(dicObj) {
        let newDicObj = {};
        let compKeyList = [];
        for (let key in dicObj) {
            let compKey = this.getCompKey(key);
            if (compKey) {
                newDicObj[compKey] = newDicObj[compKey] || {};
                newDicObj[compKey][key] = dicObj[key];
                if (compKeyList.indexOf(compKey) < 0) {
                    compKeyList.push(compKey);
                }
            }
            else {
                newDicObj[key] = dicObj[key];
                if (typeof newDicObj[key] == "object") {
                    newDicObj[key] = JSON.stringify(newDicObj[key]);
                }
            }
        }
        for (let i in compKeyList) {
            let key = compKeyList[i];
            newDicObj[key] = JSON.stringify(newDicObj[key]);
        }
        return newDicObj;
    }
    add(obj) {
        let dicObj = this.makeTableKeyDic(obj);
        let cond = this.getCond();
        for (let i in cond) {
            dicObj[i] = cond[i];
        }
        return game.sqlMgr.add(this.tb_name, dicObj);
    }
    del() {
        return game.sqlMgr.del(this.tb_name, this.getCond());
    }
    select() {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield game.sqlMgr.select(this.tb_name, this.getCond());
            if (data.length > 0) {
                let dicData = data[0];
                return this.parseTableKeyDic(dicData);
            }
            else {
                return null;
            }
        });
    }
    updateInstantly(obj) {
        let dicObj = this.makeTableKeyDic(obj);
        game.sqlMgr.update(this.tb_name, dicObj, this.getCond());
    }
    update(obj) {
        obj = this.fullCompKeyData(obj);
        let dicObj = this.makeTableKeyDic(obj);
        for (let i in dicObj) {
            this.whileUpdateKeyList[i] = dicObj[i];
        }
    }
    doSqlUpdate() {
        if (Object.keys(this.whileUpdateKeyList).length > 0) {
            game.sqlMgr.update(this.tb_name, this.whileUpdateKeyList, this.getCond());
            this.whileUpdateKeyList = {};
        }
    }
}
exports.SqlBase = SqlBase;
