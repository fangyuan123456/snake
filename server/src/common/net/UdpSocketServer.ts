import url from "url"
import * as fs from "fs";
import * as path from "path";
import { Dic, I_msg, MSG_TYPE } from "../interface/ICommon";
import { UdpSession } from "./UdpSession";
import dgram from "dgram";
export class UdpSocketServer{
    moudles:{[key:string]:any} = {}
    sessionList:Dic<UdpSession> = {}
    udpServer?:dgram.Socket
    constructor(){
        this.loadMoudles();
        this.createServer();
    }
    createServer(){
        this.udpServer = dgram.createSocket("udp4");
        let port = game.app.serverInfo.clientPort+1;
        this.udpServer.bind(port,()=>{
            game.logMgr.debug("udp server listening on port ${port}");
        })
        this.udpServer.on("message",this.onMessage.bind(this));
    }
    onMessage(data:Buffer,rinfo:dgram.RemoteInfo){
        let dataObj = game.protoMgr.decodeMsg(data);
        let session:UdpSession;
        if(dataObj.msgType == MSG_TYPE.handshake){
            this.sessionList[dataObj.msgData.uid] = new UdpSession(dataObj.msgData.uid,rinfo.address+":"+rinfo.port);
            session = this.sessionList[dataObj.msgData.uid];
            session.send({msgType:MSG_TYPE.handshake,msgData:{}});
        }else{
            session = this.sessionList[dataObj.msgData.uid];
            let cmd = data.readUInt16BE(5);
            let route = game.app.routeConfig[cmd];
            let strArr = route.split(".");
            let handlerName = strArr[strArr.length-1];
            let fileName = strArr[1];
            if(this.moudles[fileName][handlerName]){
                this.moudles[fileName][handlerName](dataObj.msgData,session,(callData:any)=>{
                    session.send({msgHead:dataObj.msgHead,msgData:callData})
                });
            }else{
                game.logMgr.error("funcName:%s is not exits",handlerName)
            }
        }
    }
    loadMoudles(){
        let moduleDir = path.join(game.utilsMgr.getAppPath(),"net/HttpHandler")
        let exists = fs.existsSync(moduleDir);
        if (exists) {
            fs.readdirSync(moduleDir).forEach((filename) => {
                if (!filename.endsWith(".js")) {
                    return;
                }
                let name = path.basename(filename, '.js');
                let handler = require(path.join(moduleDir, filename));
                if (handler.default) {
                    this.moudles[name] = new handler.default();
                }
            });
        }
    }
    getSession(uid:number){
        return this.sessionList[uid];
    }
    send(msg:I_msg,ip:string){
        let buffer = game.protoMgr.encodeMsg(msg);
        let ipArr = ip.split(":");
        let address = ipArr[0];
        let port = Number(ipArr[1]);
        this.udpServer!.send(buffer,0,buffer.length,port,address,(err)=>{
            if(err){
                game.logMgr.error("error sending response:",err);
            }else{
                game.logMgr.debug("resonse send to client:")
            }
        })
    }
}