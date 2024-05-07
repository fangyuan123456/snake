import * as mysql from "mysql";
interface Dic<T = any> {
    [key: string]: any
}
export enum e_TableName{
    USER = "t_user",
    SCORE = "t_score",
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
import { SingleBase } from "../../../common/base/SingleBase";
import { getConfigByEnv, mysqlConfig } from "../../../common/config/CommonCfg";
class SqlClient{
    private pool?: mysql.Pool;
    constructor() {
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
    private getSqlStrByArr(opsType:SqlOpsType,table:e_TableName, obj: Dic<any>|null,cond?:Dic<any>|null){
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
    add(table:e_TableName, obj: Dic<any>): Promise<any>{
        let sqlStr = this.getSqlStrByArr(SqlOpsType.ADD,table,obj);
        return this.query(sqlStr,null)
    }
    del(table:e_TableName, cond: Dic<any>): Promise<any>{
        let sqlStr = this.getSqlStrByArr(SqlOpsType.DEL,table,null,cond);
        return this.query(sqlStr,null)
    }
    update(table:e_TableName, obj: Dic<any>, cond?: Dic<any>): Promise<any>{
        let sqlStr = this.getSqlStrByArr(SqlOpsType.UPDATE,table,obj,cond);
        return this.query(sqlStr,null)
    }
    select(table:e_TableName, cond: Dic<any>): Promise<any>{
        let sqlStr = this.getSqlStrByArr(SqlOpsType.SELECT,table,null,cond);
        return this.query(sqlStr,null)
    }
    selectMorePlayer(table:e_TableName,uids:number[]){
        let sqlStr = "select * from " + table + " where uid in "+"("+uids.toString()+")"
        return this.query(sqlStr,null);
    }
}

const SelectTb = [e_TableName.ASSET,e_TableName.USER,e_TableName.INVITE_REWARD,e_TableName.SCORE]
const TbSpecailKey = ["items","inviteUid"];
const SqlCommitInterval = 10;
export class SqlManager extends SingleBase{
    sqlClient:SqlClient;
    playerInfo:Dic<Dic<any>> = {};
    needSaveInfo:Dic<Dic<any>> = {};

    //键值和数据库对应表
    keyTableNameMap:Dic<e_TableName> = {};

    isCommiting:boolean = false
    constructor(){
        super();
        this.sqlClient = new SqlClient();
        setInterval(this.commitSqlUpdate.bind(this),1000*SqlCommitInterval);
    }
    parseSQLInfo(info:Dic<string>){
        for(let i in TbSpecailKey){
            if(info[TbSpecailKey[i]]){
                info[TbSpecailKey[i]] = JSON.parse(info[TbSpecailKey[i]])
            }
        }
        return info;
    }
    stringifySQLInfo(info:Dic<any>){
        for(let i in TbSpecailKey){
            if(info[TbSpecailKey[i]]){
                info[TbSpecailKey[i]] = JSON.stringify(info[TbSpecailKey[i]])
            }
        }
        return info;
    }
    setPlayerInfo(uid:number,info:Dic<any>){
        this.needSaveInfo[uid] = this.needSaveInfo[uid] || {};
        for(let infoKey in info){
            let data = info[infoKey];
            this.needSaveInfo[uid][infoKey] = data;
        }
    }
    public selectTb(tb_name:e_TableName,cond:Dic<any>){
        return new Promise<any>((resolve, reject) => {
            this.sqlClient.select(tb_name,cond).then((infoList:Dic<any>[])=>{
                let info = infoList[0];
                if(!info){
                    this.sqlClient.add(tb_name,cond).then(async ()=>{
                        info = await this.selectTb(tb_name,cond);
                        resolve(info)
                    })
                }else{
                    info = this.parseSQLInfo(info)
                    resolve(info)
                }
            })
        })
    }
    async getPlayerInfo(uid:number,infoKeyList?:string[]){
       return new Promise<Dic<any>>((resolve, reject) => {
            let isNeedSetKeyTableName = false;
            if(Object.keys(this.keyTableNameMap).length==0){
                isNeedSetKeyTableName = true;
            }
            let info:Dic<any> = {}
            let callNum = 0;
            let selectEndCallFunc = ()=>{
                callNum --;
                if(callNum == 0){
                    if(this.needSaveInfo[uid]){
                        info = game.utilsMgr.merge(info,this.needSaveInfo[uid])
                    }
                    resolve(this.resetInfoByDefault(uid,info));
                }
            }
            let needSelectTb:e_TableName[] = SelectTb;
            if(infoKeyList){
                needSelectTb = this.getTbNameByKeyList(infoKeyList);
            }
            for(let i in needSelectTb){
                callNum++;
                let tb_name = needSelectTb[i];
                this.selectTb(tb_name,{uid:uid}).then((_dataInfo)=>{
                    if(isNeedSetKeyTableName){
                        for(let key in _dataInfo){
                            this.keyTableNameMap[key] = tb_name;
                        }
                    }
                    game.utilsMgr.merge(info,_dataInfo)
                    selectEndCallFunc();
                })
            }
        })
    }
    private resetInfoByDefault(uid:number,info:Dic<any>){
        if(info.nickName){
            info.nickName = "uid_"+ uid
        }
        return info
    }
    spliceInfoByTbName(info:Dic<string>):Dic<Dic<any>>{
        let infoMap:Dic<Dic<any>> = {}
        for(let i in info){
            let tb_name = this.keyTableNameMap[i];
            infoMap[tb_name] = infoMap[tb_name] || {};
            infoMap[tb_name][i] = info[i];
        }
        return infoMap
    }
    getTbNameByKeyList(keyList:string[]){
        let tbList:e_TableName[] = []
        for(let i in keyList){
            let key = keyList[i];
            let tb_name = this.keyTableNameMap[key];
            if(tbList.indexOf(tb_name)<0){
                tbList.push(tb_name);
            }
        }
        return tbList
    }
    commitSqlUpdate(){
        let commitTimes = 0;
        let commitEndCallFunc = ()=>{
            commitTimes--;
            if(commitTimes==0){
                this.isCommiting = false;
            }
        }
        if(!this.isCommiting && Object.keys(this.needSaveInfo).length>0){
            this.isCommiting  = true;
            for(let uid in this.needSaveInfo){
                let infos = this.spliceInfoByTbName(this.needSaveInfo[uid]);
                for(let i in infos){
                    let tb_name = i as e_TableName;
                    this.sqlClient.update(tb_name,this.stringifySQLInfo(infos[i]),{uid:uid}).then(()=>{
                        for(let  i in infos){
                            this.needSaveInfo[uid][i] = null; 
                        }
                        if(Object.keys(this.needSaveInfo[uid]).length == 0){
                            delete this.needSaveInfo[uid];
                        }
                        commitEndCallFunc();
                    });
                }
            }
        }
    }
}