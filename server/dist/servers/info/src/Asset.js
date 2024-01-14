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
exports.Asset = void 0;
const SqlBase_1 = require("../../../common/base/SqlBase");
const SqlManager_1 = require("../../../common/manager/SqlManager");
let defaultItems = {
    1: {
        num: 2
    },
    2: {
        num: 2
    }
};
class Asset extends SqlBase_1.SqlBase {
    constructor(player) {
        super(SqlManager_1.TableName.ASSET, { uid: player.uid });
        this.compKey = {};
        this.defaultCompKey = "items";
        this.items = {};
        this.whileUpdateSqlKeyMap = {};
        this.player = player;
    }
    init() {
        const _super = Object.create(null, {
            init: { get: () => super.init }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                _super.init.call(this, defaultItems).then((data) => {
                    this.items = data;
                    resolve(data);
                });
            }));
        });
    }
    getAllDataByCompKey(compKey) {
        let newDic = {};
        if (compKey == this.defaultCompKey) {
            for (let key in this.items) {
                if (!isNaN(Number(key))) {
                    newDic[key] = this.items[key];
                }
            }
        }
        else {
            let keyList = this.compKey[compKey];
            for (let key in keyList) {
                newDic[key] = this.items[key];
            }
        }
        return newDic;
    }
    update() {
    }
}
exports.Asset = Asset;
