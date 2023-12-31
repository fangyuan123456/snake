declare global{
    namespace globalThis{
        var game:GameServerBase
    }
}
import * as fs from "fs";
import * as path from "path";
import { Application, connector } from "mydog";
import { LogManager } from "../manager/LogManager";
import { UtilsManager } from "../manager/UtilsManager";
import { ProtoManager } from "../manager/ProtoManager";
import { HttpManager } from "../manager/HttpManager";
import { TimeManager } from "../manager/TimeManager";
import { ConnectSvrOnLineNumComp } from "../components/ConnectSvrOnLineNumComp";
import { getConfigByEnv, mysqlConfig, serverType } from "../config/GameCfg";
import { PlatformManager } from "../manager/PlatformManager";
import { SqlManager } from "../manager/SqlManager";

export class GameServerBase{
    clientNum:number = 0
    cpuUsage:string = ""
    app:Application
    logMgr:LogManager
    utilsMgr:UtilsManager
    protoMgr:ProtoManager
    httpMgr?:HttpManager
    timeMgr:TimeManager
    platformMgr:PlatformManager
    svrNumComp?:ConnectSvrOnLineNumComp
    sqlMgr:SqlManager
    constructor(app:Application){
        this.app = app;
        globalThis.game = this;
        this.logMgr = LogManager.getInstance();
        this.utilsMgr = UtilsManager.getInstance();
        this.protoMgr = ProtoManager.getInstance();
        this.timeMgr = TimeManager.getInstance();
        this.platformMgr = PlatformManager.getInstance();
        this.sqlMgr = SqlManager.getInstance();
        this.uncaughtException();
        this.initCupUsage();
        this.setConfig();
        this.app.start();
        if(this.app.serverInfo.HttpPort){
            this.httpMgr = HttpManager.getInstance();
        }
    }
    getCert(){
        if (this.app.env === "production") {
            return {
                key:fs.readFileSync(path.join(this.utilsMgr.getAppPath(), "../www.mydog.wiki.key")),
                cert:fs.readFileSync(path.join(this.utilsMgr.getAppPath(), "../www.mydog.wiki.key"))
            }
        }else{
            return {
                key:"",
                cert:""
            }
        }
    }
    setConfig(){
        let cert = this.getCert();
        this.app.setConfig("mydogList", this.mydogList);
        this.app.setConfig("connector", {
            "connector": connector.Ws,
            "clientOnCb": this.onUserIn,
            "clientOffCb": this.onUserLeave,
            "interval": 50,
            "noDelay": false,
            "ssl": this.app.env === "production",
            "key": cert.key,
            "cert": cert.cert,
        });
        this.app.setConfig("rpc", { "interval": 30, "noDelay": false });
        this.app.setConfig("encodeDecode", { "msgDecode": this.protoMgr.decode, "msgEncode": this.protoMgr.encode });
        this.app.setConfig("logger", (level, info) => {
            if (level !== "debug") {
                this.logMgr[level](info);
            }
        })
    }
    mydogList(){
        let onlineNum = "--";
        if (this.app.serverInfo.clientPort) {
            onlineNum = this.app.clientNum.toString();
        }
        return [
            { "title": "cpu(%)", "value": this.cpuUsage },
            { "title": "onlineNum", "value": onlineNum },
        ];
    }
    initCupUsage(){
        let last = process.cpuUsage();

        setInterval(() => {
            let diff = process.cpuUsage(last);
            last = process.cpuUsage();
            this.cpuUsage = ((diff.user + diff.system) / (5000 * 1000) * 100).toFixed(1);
        }, 5000);
    }
    onUserIn(){

    }
    onUserLeave(){

    }
    uncaughtException(){
        process.on("uncaughtException", function (err: any) {
            game.logMgr.error(err)
        });
    }

}