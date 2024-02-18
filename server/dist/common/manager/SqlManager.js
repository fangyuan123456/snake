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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqlManager = exports.TableName = void 0;
const mysql = __importStar(require("mysql"));
var TableName;
(function (TableName) {
    TableName["USER"] = "t_user";
    TableName["ASSET"] = "t_asset";
    TableName["INVITE_REWARD"] = "t_inviteReward";
})(TableName || (exports.TableName = TableName = {}));
var SqlOpsType;
(function (SqlOpsType) {
    SqlOpsType[SqlOpsType["ADD"] = 0] = "ADD";
    SqlOpsType[SqlOpsType["DEL"] = 1] = "DEL";
    SqlOpsType[SqlOpsType["UPDATE"] = 2] = "UPDATE";
    SqlOpsType[SqlOpsType["SELECT"] = 3] = "SELECT";
})(SqlOpsType || (SqlOpsType = {}));
const SingleBase_1 = require("../base/SingleBase");
const CommonCfg_1 = require("../config/CommonCfg");
class SqlManager extends SingleBase_1.SingleBase {
    constructor() {
        super();
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
exports.SqlManager = SqlManager;
