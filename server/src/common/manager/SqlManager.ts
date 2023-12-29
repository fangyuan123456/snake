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
    private pool?: mysql.Pool;
    constructor() {
        super();
     
    }
    query(sql: string, args: any, cb?: callback): Promise<any> {
        if(!this.pool){
            let config = getConfigByEnv(mysqlConfig);
            this.pool = mysql.createPool(config);
        }
        return new Promise((resolve, reject)=>{
            this.pool!.getConnection((err, connection) => {
                if (!err) {
                    connection.query(sql, args, (err, res) => {
                        connection.release();
                        if(!err){
                            resolve(res) ;
                        }else{
                            game.logMgr.error(err);
                            reject(err);
                        }
                       
                    });
                } else {
                    game.logMgr.error(err);
                    reject(err);
                }
            });
        })
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
            let valueStr = "";
            if (typeof value === "string") {
                valueStr = "'" + value + "'";
            } else if (typeof value === "object") {
                valueStr = "'" + JSON.stringify(value) + "'";
            } else {
                valueStr = value;
            }
            valueArr.push(valueStr);
            parmStr += (key + " = " +valueStr); 
        }
        let sqlStr = ""
        if(opsType == SqlOpsType.ADD){
            sqlStr = "insert into " + table +" (" + fieldArr.join(",") + ") values(" + valueArr.join(",") + ")"
        }else if(opsType == SqlOpsType.DEL){
            sqlStr = "delete from " + table + " where "+ parmStr
        }else if(opsType == SqlOpsType.UPDATE){
            sqlStr = "update " + table + " set "+ parmStr
        }else if(opsType == SqlOpsType.SELECT){
            sqlStr = "select * from " + table + " where "+ parmStr
        }
        return sqlStr;
    }
    add(table:string, obj: Dic<any>): Promise<any>{
        let sqlStr = this.getSqlStrByArr(SqlOpsType.ADD,table,obj);
        return this.query(sqlStr,null)
    }
    del(table:string, obj: Dic<any>): Promise<any>{
        let sqlStr = this.getSqlStrByArr(SqlOpsType.DEL,table,obj);
        return this.query(sqlStr,null)
    }
    update(table:string, obj: Dic<any>): Promise<any>{
        let sqlStr = this.getSqlStrByArr(SqlOpsType.UPDATE,table,obj);
        return this.query(sqlStr,null)
    }
    select(table:string, obj: Dic<any>): Promise<any>{
        let sqlStr = this.getSqlStrByArr(SqlOpsType.SELECT,table,obj);
        return this.query(sqlStr,null)
    }

}