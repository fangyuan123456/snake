import * as mysql from "mysql";
interface Dic<T = any> {
    [key: string]: any
}
export enum TableName{
    USER = "t_user",
    ASSET = "t_asset",
    INVITE_REWARD = "t_inviteReward"
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
    private getSqlStrByArr(opsType:SqlOpsType,table:TableName, obj: Dic<any>|null,cond?:Dic<any>|null){
        let getSqlStrFunc=(obj:Dic<any>,isInsert:boolean = false)=>{
            if(!obj){
                return ""
            }
            let fieldArr: string[] = [];
            let valueArr: string[] = [];
            for (let key in obj) {
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
            }
            if(isInsert){
                return " (" + fieldArr.join(",") + ") values(" + valueArr.join(",") + ")"
            }else{
                let str = "";
                for(let i in fieldArr){
                    if(str!=""){
                        str += ","
                    }
                    str += (fieldArr[i] + " = " +valueArr[i]); 
                }
                return str;
            }
        }
        let sqlStr = ""
        if(opsType == SqlOpsType.ADD){
            sqlStr = "insert into " + table + getSqlStrFunc(obj!,true);
        }else if(opsType == SqlOpsType.DEL){
            sqlStr = "delete from " + table + " where "+ getSqlStrFunc(cond!)
        }else if(opsType == SqlOpsType.UPDATE){
            sqlStr = "update " + table + " set " + getSqlStrFunc(obj!) + " where "+ getSqlStrFunc(cond!)
        }else if(opsType == SqlOpsType.SELECT){
            sqlStr = "select * from " + table + " where "+ getSqlStrFunc(cond!)
        }
        return sqlStr;
    }
    add(table:TableName, obj: Dic<any>): Promise<any>{
        let sqlStr = this.getSqlStrByArr(SqlOpsType.ADD,table,obj);
        return this.query(sqlStr,null)
    }
    del(table:TableName, cond: Dic<any>): Promise<any>{
        let sqlStr = this.getSqlStrByArr(SqlOpsType.DEL,table,null,cond);
        return this.query(sqlStr,null)
    }
    update(table:TableName, obj: Dic<any>, cond?: Dic<any>): Promise<any>{
        let sqlStr = this.getSqlStrByArr(SqlOpsType.UPDATE,table,obj,cond);
        return this.query(sqlStr,null)
    }
    select(table:TableName, cond: Dic<any>): Promise<any>{
        let sqlStr = this.getSqlStrByArr(SqlOpsType.SELECT,table,null,cond);
        return this.query(sqlStr,null)
    }
    selectMorePlayer(table:TableName,uids:number[]){
        let sqlStr = "select * from " + table + " where uid in "+"("+uids.toString()+")"
        return this.query(sqlStr,null);
    }

}