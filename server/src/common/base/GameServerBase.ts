declare global{
    namespace globalThis{
        var game:GameServerBase
    }
}
import * as fs from "fs";
import * as path from "path";
import { Application, Session, connector } from "mydog";
import { LogManager } from "../manager/LogManager";
import { UtilsManager } from "../manager/UtilsManager";
import { ProtoManager } from "../manager/ProtoManager";
import { HttpServer } from "../net/HttpServer";
import { TimeManager } from "../manager/TimeManager";
import { serverType } from "../config/CommonCfg";
import { PlatformManager } from "../manager/PlatformManager";
import { SqlManager } from "../manager/SqlManager";
import { EventManager } from "../manager/EventManager";
import { ConfigManager } from "../manager/ConfigManager";
import { I_msg } from "../interface/ICommon";

export class GameServerBase{
    clientNum:number = 0
    cpuUsage:string = ""
    app:Application
    logMgr:LogManager
    utilsMgr:UtilsManager
    protoMgr:ProtoManager
    httpServer?:HttpServer
    timeMgr:TimeManager
    platformMgr:PlatformManager
    eventMgr:EventManager
    sqlMgr:SqlManager
    configMgr: ConfigManager;
    constructor(app:Application){
        this.app = app;
        globalThis.game = this;
        this.logMgr = LogManager.getInstance();
        this.utilsMgr = UtilsManager.getInstance();
        this.protoMgr = ProtoManager.getInstance();
        this.timeMgr = TimeManager.getInstance();
        this.platformMgr = PlatformManager.getInstance();
        this.eventMgr = EventManager.getInstance();
        this.sqlMgr = SqlManager.getInstance();
        this.configMgr = ConfigManager.getInstance();
        this.uncaughtException();
        this.initCupUsage();
        this.setConfig();
        this.app.start();
        if(this.app.serverInfo.HttpPort){
            this.httpServer = new HttpServer();
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
        this.app.setConfig("rpc", { "interval": 30, "noDelay": false });
        this.app.setConfig("encodeDecode", { "msgDecode": this.protoMgr.decode.bind(this.protoMgr), "msgEncode": this.protoMgr.encode.bind(this.protoMgr) });
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
    uncaughtException(){
        process.on("uncaughtException", function (err: any) {
            game.logMgr.error(err)
        });
    }
    sendMsg(uid:number|number[],data:I_msg,frontServer:serverType = serverType.center){
        if(Array.isArray(uid)){
            for(let i in uid){
                this.sendMsg(uid[i],data,frontServer)
            }
        }else{
            let cmd = game.protoMgr.getProtoCode(data.msgHead!)
            if(cmd || cmd == 0){
                let sid = game.utilsMgr.getSid(uid,frontServer);
                this.app.sendMsgByUidSid(cmd,data.msgData,[{uid:uid,sid:sid}])
            }else{
                game.logMgr.error("msgHead:%s is not find",data.msgHead)
            }
        }
    
    }

}