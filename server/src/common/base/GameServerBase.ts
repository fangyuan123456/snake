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
import { EventManager } from "../manager/EventManager";
import { ConfigManager } from "../manager/ConfigManager";
import { Dic, I_msg } from "../interface/ICommon";
import { InfoManager } from "../manager/InfoManager";
import { SystemBase } from "./SystemBase";

export class GameServerBase{
    bundleInfoKeyCfg:Dic<string[]> = {};
    isNeedCacheInfo:boolean = false;
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
    configMgr: ConfigManager;
    infoMgr:InfoManager;
    systemList:SystemBase[] = [];
    constructor(app:Application){
        this.app = app;
        globalThis.game = this;
        this.logMgr = LogManager.getInstance();
        this.utilsMgr = UtilsManager.getInstance();
        this.protoMgr = ProtoManager.getInstance();
        this.timeMgr = TimeManager.getInstance();
        this.platformMgr = PlatformManager.getInstance();
        this.eventMgr = EventManager.getInstance();
        this.configMgr = ConfigManager.getInstance();
        this.infoMgr = InfoManager.getInstance();
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
    setConfig(bundleInfoKeyCfg?:Dic<string[]>,isNeedCacheInfo:boolean = false){
        if(bundleInfoKeyCfg){
            this.bundleInfoKeyCfg = bundleInfoKeyCfg;
        }
        this.isNeedCacheInfo = isNeedCacheInfo;
        this.app.setConfig("rpc", { "interval": 30, "noDelay": false });
        this.app.setConfig("encodeDecode", { "msgDecode": this.protoMgr.decode.bind(this.protoMgr), "msgEncode": this.protoMgr.encode.bind(this.protoMgr) });
        this.app.setConfig("logger", (level, info) => {
            if (level !== "debug") {
                this.logMgr[level](info);
            }
        })
    }
    callSystemHandler(msgName: string, msg: any, session: Session, next: Function){
        for(let i in this.systemList){
            let system:SystemBase = this.systemList[i];
            //@ts-ignore
            let func = system[msgName+"Handler"]
            if(func){
                func.call(msg, session, next);
                return;
            }
        }
        game.logMgr.error("msgName:%s is not found in Room",msgName);
    }
    getAllBundleInfoKey(){
        let keyList:string[] = [];
        for(let bundleName in this.bundleInfoKeyCfg){
            for(let i in this.bundleInfoKeyCfg[bundleName]){
                let key = this.bundleInfoKeyCfg[bundleName][i]
                if(keyList.indexOf(key)<0){
                    keyList.push(key);
                }
            }
        }
        if(keyList.length>0){
            return keyList;
        }
    }
    getIsNeedCacheInfo(){
        return this.isNeedCacheInfo;
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
    sendMsg(uid:number|number[],data:I_msg,frontServer:serverType = serverType.connector){
        if(Array.isArray(uid)){
            for(let i in uid){
                this.sendMsg(uid[i],data,frontServer)
            }
        }else{
            let cmd = game.protoMgr.getProtoCode(data.msgHead!)
            if(cmd || cmd == 0){
                if(this.app.serverInfo.frontend){
                    this.app.sendMsgByUid(cmd,data.msgData,[uid]);
                }else{
                    let sid = game.utilsMgr.getSid(uid,frontServer);
                    this.app.sendMsgByUidSid(cmd,data.msgData,[{uid:uid,sid:sid}])
                }
            }else{
                game.logMgr.error("msgHead:%s is not find",data.msgHead)
            }
        }
    
    }

}