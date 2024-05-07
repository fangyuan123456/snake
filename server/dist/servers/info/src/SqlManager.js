"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.SqlManager = exports.e_TableName = void 0;
const mysql = __importStar(require("mysql"));
var e_TableName;
(function (e_TableName) {
    e_TableName["USER"] = "t_user";
    e_TableName["SCORE"] = "t_score";
    e_TableName["ASSET"] = "t_asset";
    e_TableName["INVITE_REWARD"] = "t_inviteReward";
})(e_TableName || (exports.e_TableName = e_TableName = {}));
var SqlOpsType;
(function (SqlOpsType) {
    SqlOpsType[SqlOpsType["ADD"] = 0] = "ADD";
    SqlOpsType[SqlOpsType["DEL"] = 1] = "DEL";
    SqlOpsType[SqlOpsType["UPDATE"] = 2] = "UPDATE";
    SqlOpsType[SqlOpsType["SELECT"] = 3] = "SELECT";
})(SqlOpsType || (SqlOpsType = {}));
const SingleBase_1 = require("../../../common/base/SingleBase");
const CommonCfg_1 = require("../../../common/config/CommonCfg");
class SqlClient {
    constructor() {
    }
    query(sql, args, cb) {
        if (!this.pool) {
            let config = (0, CommonCfg_1.getConfigByEnv)(CommonCfg_1.mysqlConfig);
            this.pool = mysql.createPool(config);
        }
        return new Promise((resolve, reject) => {
            this.pool.getConnection((err, connection) => {
                if (!err) {
                    connection.query(sql, args, (err, res) => {
                        connection.release();
                        if (!err) {
                            resolve(res);
                        }
                        else {
                            game.logMgr.error(err);
                            reject(err);
                        }
                    });
                }
                else {
                    game.logMgr.error(err);
                    reject(err);
                }
            });
        });
    }
    getSqlStrByArr(opsType, table, obj, cond) {
        let getSqlStrFunc = (obj, isInsert = false) => {
            if (!obj) {
                return "";
            }
            let fieldArr = [];
            let valueArr = [];
            for (let key in obj) {
                fieldArr.push(key);
                let value = obj[key];
                let valueStr = "";
                if (typeof value === "string") {
                    valueStr = "'" + value + "'";
                }
                else if (typeof value === "object") {
                    valueStr = "'" + JSON.stringify(value) + "'";
                }
                else {
                    valueStr = value;
                }
                valueArr.push(valueStr);
            }
            if (isInsert) {
                return " (" + fieldArr.join(",") + ") values(" + valueArr.join(",") + ")";
            }
            else {
                let str = "";
                for (let i in fieldArr) {
                    if (str != "") {
                        str += ",";
                    }
                    str += (fieldArr[i] + " = " + valueArr[i]);
                }
                return str;
            }
        };
        let sqlStr = "";
        if (opsType == SqlOpsType.ADD) {
            sqlStr = "insert into " + table + getSqlStrFunc(obj, true);
        }
        else if (opsType == SqlOpsType.DEL) {
            sqlStr = "delete from " + table + " where " + getSqlStrFunc(cond);
        }
        else if (opsType == SqlOpsType.UPDATE) {
            sqlStr = "update " + table + " set " + getSqlStrFunc(obj) + " where " + getSqlStrFunc(cond);
        }
        else if (opsType == SqlOpsType.SELECT) {
            sqlStr = "select * from " + table + " where " + getSqlStrFunc(cond);
        }
        return sqlStr;
    }
    add(table, obj) {
        let sqlStr = this.getSqlStrByArr(SqlOpsType.ADD, table, obj);
        return this.query(sqlStr, null);
    }
    del(table, cond) {
        let sqlStr = this.getSqlStrByArr(SqlOpsType.DEL, table, null, cond);
        return this.query(sqlStr, null);
    }
    update(table, obj, cond) {
        let sqlStr = this.getSqlStrByArr(SqlOpsType.UPDATE, table, obj, cond);
        return this.query(sqlStr, null);
    }
    select(table, cond) {
        let sqlStr = this.getSqlStrByArr(SqlOpsType.SELECT, table, null, cond);
        return this.query(sqlStr, null);
    }
    selectMorePlayer(table, uids) {
        let sqlStr = "select * from " + table + " where uid in " + "(" + uids.toString() + ")";
        return this.query(sqlStr, null);
    }
}
const SelectTb = [e_TableName.ASSET, e_TableName.USER, e_TableName.INVITE_REWARD, e_TableName.SCORE];
const TbSpecailKey = ["items", "inviteUid"];
const SqlCommitInterval = 10;
class SqlManager extends SingleBase_1.SingleBase {
    constructor() {
        super();
        this.playerInfo = {};
        this.needSaveInfo = {};
        //键值和数据库对应表
        this.keyTableNameMap = {};
        this.isCommiting = false;
        this.sqlClient = new SqlClient();
        setInterval(this.commitSqlUpdate.bind(this), 1000 * SqlCommitInterval);
    }
    parseSQLInfo(info) {
        for (let i in TbSpecailKey) {
            if (info[TbSpecailKey[i]]) {
                info[TbSpecailKey[i]] = JSON.parse(info[TbSpecailKey[i]]);
            }
        }
        return info;
    }
    stringifySQLInfo(info) {
        for (let i in TbSpecailKey) {
            if (info[TbSpecailKey[i]]) {
                info[TbSpecailKey[i]] = JSON.stringify(info[TbSpecailKey[i]]);
            }
        }
        return info;
    }
    setPlayerInfo(uid, info) {
        this.needSaveInfo[uid] = this.needSaveInfo[uid] || {};
        for (let infoKey in info) {
            let data = info[infoKey];
            this.needSaveInfo[uid][infoKey] = data;
        }
    }
    selectTb(tb_name, cond) {
        return new Promise((resolve, reject) => {
            this.sqlClient.select(tb_name, cond).then((infoList) => {
                let info = infoList[0];
                if (!info) {
                    this.sqlClient.add(tb_name, cond).then(() => __awaiter(this, void 0, void 0, function* () {
                        info = yield this.selectTb(tb_name, cond);
                        resolve(info);
                    }));
                }
                else {
                    info = this.parseSQLInfo(info);
                    resolve(info);
                }
            });
        });
    }
    getPlayerInfo(uid, infoKeyList) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                let isNeedSetKeyTableName = false;
                if (Object.keys(this.keyTableNameMap).length == 0) {
                    isNeedSetKeyTableName = true;
                }
                let info = {};
                let callNum = 0;
                let selectEndCallFunc = () => {
                    callNum--;
                    if (callNum == 0) {
                        if (this.needSaveInfo[uid]) {
                            info = game.utilsMgr.merge(info, this.needSaveInfo[uid]);
                        }
                        resolve(this.resetInfoByDefault(uid, info));
                    }
                };
                let needSelectTb = SelectTb;
                if (infoKeyList) {
                    needSelectTb = this.getTbNameByKeyList(infoKeyList);
                }
                for (let i in needSelectTb) {
                    callNum++;
                    let tb_name = needSelectTb[i];
                    this.selectTb(tb_name, { uid: uid }).then((_dataInfo) => {
                        if (isNeedSetKeyTableName) {
                            for (let key in _dataInfo) {
                                this.keyTableNameMap[key] = tb_name;
                            }
                        }
                        game.utilsMgr.merge(info, _dataInfo);
                        selectEndCallFunc();
                    });
                }
            });
        });
    }
    resetInfoByDefault(uid, info) {
        if (info.nickName) {
            info.nickName = "uid_" + uid;
        }
        return info;
    }
    spliceInfoByTbName(info) {
        let infoMap = {};
        for (let i in info) {
            let tb_name = this.keyTableNameMap[i];
            infoMap[tb_name] = infoMap[tb_name] || {};
            infoMap[tb_name][i] = info[i];
        }
        return infoMap;
    }
    getTbNameByKeyList(keyList) {
        let tbList = [];
        for (let i in keyList) {
            let key = keyList[i];
            let tb_name = this.keyTableNameMap[key];
            if (tbList.indexOf(tb_name) < 0) {
                tbList.push(tb_name);
            }
        }
        return tbList;
    }
    commitSqlUpdate() {
        let commitTimes = 0;
        let commitEndCallFunc = () => {
            commitTimes--;
            if (commitTimes == 0) {
                this.isCommiting = false;
            }
        };
        if (!this.isCommiting && Object.keys(this.needSaveInfo).length > 0) {
            this.isCommiting = true;
            for (let uid in this.needSaveInfo) {
                let infos = this.spliceInfoByTbName(this.needSaveInfo[uid]);
                for (let i in infos) {
                    let tb_name = i;
                    this.sqlClient.update(tb_name, this.stringifySQLInfo(infos[i]), { uid: uid }).then(() => {
                        for (let i in infos) {
                            this.needSaveInfo[uid][i] = null;
                        }
                        if (Object.keys(this.needSaveInfo[uid]).length == 0) {
                            delete this.needSaveInfo[uid];
                        }
                        commitEndCallFunc();
                    });
                }
            }
        }
    }
}
exports.SqlManager = SqlManager;
