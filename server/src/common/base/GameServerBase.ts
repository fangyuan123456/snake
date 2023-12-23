declare global{
    namespace globalThis{
        var game:GameServerBase
    }
}
import * as fs from "fs";
import * as path from "path";
import { Application, connector } from "mydog";
import { LoginServer } from "../../servers/login/LoginServer";
import { LogManager } from "../manager/LogManager";
import { serverType } from "../config/GameCfg";
import { UtilsManager } from "../manager/UtilsManager";
import { ProtoManager } from "../manager/ProtoManager";
import { HttpManager } from "../manager/HttpManager";

export class GameServerBase{
    clientNum:number = 0
    cpuUsage:string = ""
    app:Application
    logMgr:LogManager
    utilsMgr:UtilsManager
    protoManger:ProtoManager
    constructor(app:Application){
        this.app = app;
        game = this;
        this.logMgr = LogManager.getInstance();
        this.utilsMgr = UtilsManager.getInstance();
        this.protoManger = ProtoManager.getInstance();
        this.initCupUsage();
        this.setConfig();
        this.app.start();

        if(this.app.serverInfo.HttpPort){
            HttpManager.getInstance();
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
        this.app.setConfig("encodeDecode", { "msgDecode": this.protoManger.decode, "msgEncode": this.protoManger.encode });
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
}
process.on("uncaughtException", function (err: any) {
    game.logMgr.error(err)
});