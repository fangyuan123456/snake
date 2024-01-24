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
        this.cond = null;
        this.whileUpdateKeyList = {};
        this.getInfoResolveCallList = [];
        this.tb_name = tb_name;
        this.cond = cond;
        this.init();
    }
    init(defaultData) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            let data = yield this.select();
            if (!data) {
                defaultData = defaultData || {};
                data = defaultData;
                this.add(defaultData);
            }
            this.data = data;
            resolve(this.data);
            this.callGetInfoResolve();
        }));
    }
    callGetInfoResolve() {
        let data = this.data;
        if (data) {
            for (let i in this.getInfoResolveCallList) {
                let callBack = this.getInfoResolveCallList[i];
                if (callBack) {
                    callBack(this.data);
                }
            }
            this.getInfoResolveCallList = [];
        }
    }
    getInfo() {
        return new Promise((resolve, reject) => {
            this.getInfoResolveCallList.push(resolve);
            this.callGetInfoResolve();
        });
    }
    getCond() {
        return this.cond;
    }
    fullCompKeyData(obj, compKey) {
        return this.data[compKey];
    }
    parseTableKeyDic(dicObj) {
        let cond = this.getCond();
        let newDicObj = {};
        for (let key in dicObj) {
            if (!cond[key]) {
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
        for (let key in dicObj) {
            newDicObj[key] = dicObj[key];
            if (typeof newDicObj[key] == "object") {
                newDicObj[key] = JSON.stringify(newDicObj[key]);
            }
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
    updateInstantly(obj, compKey) {
        if (compKey) {
            obj = this.fullCompKeyData(obj, compKey);
        }
        let dicObj = this.makeTableKeyDic(obj);
        game.sqlMgr.update(this.tb_name, dicObj, this.getCond());
    }
    update(obj, compKey) {
        if (compKey) {
            obj = this.fullCompKeyData(obj, compKey);
        }
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
