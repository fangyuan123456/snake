import mysql = require("mysql");
interface Dic<T = any> {
    [key: string]: any
}
enum SqlOpsType{
    ADD,
    DEL,
    UPDATE,
    SELECT
}
type callback = (err: mysql.MysqlError | null, res?: any) => void
import { SingleBase } from "../base/SingleBase";
import { getConfigByEnv, mysqlConfig } from "../config/GameCfg";
export class SqlManager extends SingleBase{
    private pool: mysql.Pool;
    constructor() {
        super();
        let config = getConfigByEnv(mysqlConfig);
        this.pool = mysql.createPool(config);
    }
    query(sql: string, args: any, cb?: callback) {
        this.pool.getConnection((err, connection) => {
            if (!err) {
                connection.query(sql, args, (err, res) => {
                    connection.release();
                    cb && cb(err, res);
                });
            } else {
                cb && cb(err);
            }
        });
    }
    private getSqlStrByArr(opsType:SqlOpsType,table:string, obj: Dic<any>){
        let parmStr = "";
        let fieldArr: string[] = [];
        let valueArr: string[] = [];
        for (let key in obj) {
            if(parmStr!=""){
                parmStr += ","
            }
            fieldArr.push(key);
            let value = obj[key];
            if (typeof value === "string") {
                valueArr.push("'" + value + "'");
            } else if (typeof value === "object") {
                valueArr.push("'" + JSON.stringify(value) + "'");
            } else {
                valueArr.push(value);
            }
            parmStr += (key + " = " +value) 
        }
        let sqlStr = ""
        if(opsType == SqlOpsType.ADD){
            sqlStr = "insert into " + table +" (" + fieldArr.join(",") + ") values(" + valueArr.join(",") + ")"
        }else if(opsType == SqlOpsType.DEL){
            sqlStr = "delete from " + table + " where "+ parmStr
        }else if(opsType == SqlOpsType.UPDATE){
            sqlStr = "delete from " + table + " where "+ parmStr
        }else if(opsType == SqlOpsType.SELECT){
            sqlStr = "delete from " + table + " where "+ parmStr
            
        }
        return sqlStr;
    }
    add(table:string, obj: Dic<any>,callBack:(data:any)=>void){
        let sqlStr = this.getSqlStrByArr(SqlOpsType.ADD,table,obj);
        this.query(sqlStr,null,callBack)
    }
    del(table:string, obj: Dic<any>,callBack:(data:any)=>void){
        let sqlStr = this.getSqlStrByArr(SqlOpsType.DEL,table,obj);
        this.query(sqlStr,null,callBack)
    }
    update(table:string, obj: Dic<any>,callBack:(data:any)=>void){
        let sqlStr = this.getSqlStrByArr(SqlOpsType.UPDATE,table,obj);
        this.query(sqlStr,null,callBack)
    }
    select(table:string, obj: Dic<any>,callBack:(data:any)=>void){
        let sqlStr = this.getSqlStrByArr(SqlOpsType.SELECT,table,obj);
        this.query(sqlStr,null,callBack)
    }

}