"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqlManager = void 0;
const mysql = require("mysql");
var SqlOpsType;
(function (SqlOpsType) {
    SqlOpsType[SqlOpsType["ADD"] = 0] = "ADD";
    SqlOpsType[SqlOpsType["DEL"] = 1] = "DEL";
    SqlOpsType[SqlOpsType["UPDATE"] = 2] = "UPDATE";
    SqlOpsType[SqlOpsType["SELECT"] = 3] = "SELECT";
})(SqlOpsType || (SqlOpsType = {}));
const SingleBase_1 = require("../base/SingleBase");
const GameCfg_1 = require("../config/GameCfg");
class SqlManager extends SingleBase_1.SingleBase {
    constructor() {
        super();
    }
    query(sql, args, cb) {
        if (!this.pool) {
            let config = (0, GameCfg_1.getConfigByEnv)(GameCfg_1.mysqlConfig);
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
    getSqlStrByArr(opsType, table, obj) {
        let parmStr = "";
        let fieldArr = [];
        let valueArr = [];
        for (let key in obj) {
            if (parmStr != "") {
                parmStr += ",";
            }
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
            parmStr += (key + " = " + valueStr);
        }
        let sqlStr = "";
        if (opsType == SqlOpsType.ADD) {
            sqlStr = "insert into " + table + " (" + fieldArr.join(",") + ") values(" + valueArr.join(",") + ")";
        }
        else if (opsType == SqlOpsType.DEL) {
            sqlStr = "delete from " + table + " where " + parmStr;
        }
        else if (opsType == SqlOpsType.UPDATE) {
            sqlStr = "update " + table + " set " + parmStr;
        }
        else if (opsType == SqlOpsType.SELECT) {
            sqlStr = "select * from " + table + " where " + parmStr;
        }
        return sqlStr;
    }
    add(table, obj) {
        let sqlStr = this.getSqlStrByArr(SqlOpsType.ADD, table, obj);
        return this.query(sqlStr, null);
    }
    del(table, obj) {
        let sqlStr = this.getSqlStrByArr(SqlOpsType.DEL, table, obj);
        return this.query(sqlStr, null);
    }
    update(table, obj) {
        let sqlStr = this.getSqlStrByArr(SqlOpsType.UPDATE, table, obj);
        return this.query(sqlStr, null);
    }
    select(table, obj) {
        let sqlStr = this.getSqlStrByArr(SqlOpsType.SELECT, table, obj);
        return this.query(sqlStr, null);
    }
}
exports.SqlManager = SqlManager;
