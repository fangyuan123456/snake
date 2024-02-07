import { Application, Session, connector } from "mydog";
import { GameServerBase } from "../../common/base/GameServerBase";
import { Room } from "./src/Room";
import { UdpSocketServer } from "../../common/net/UdpSocketServer";
import { serverType } from "../../common/config/CommonCfg";
import { I_msg } from "../../common/interface/ICommon";
import { e_roomType } from "../../common/interface/IGame";
declare global{
    namespace globalThis{
        var gameGame:GameServer
    }
}
export class GameServer extends GameServerBase{
    rooms:{[key:number]:Room} = {};
    udpServer:UdpSocketServer
    constructor(app:Application){
        super(app);
        globalThis.gameGame = this;
        this.udpServer = new UdpSocketServer();
    }
    setConfig(): void {
        super.setConfig();
        let cert = this.getCert();
        this.app.setConfig("mydogList", this.mydogList);
        this.app.setConfig("connector", {
            "connector": connector.Ws,
            "clientOnCb": this.onUserIn.bind(this),
            "clientOffCb": this.onUserLeave.bind(this),
            "interval": 50,
            "noDelay": false,
            "ssl": this.app.env === "production",
            "key": cert.key,
            "cert": cert.cert,
            "heartbeat":10000
        });
        this.app.configure(serverType.center, this.route.bind(this));
    }
    route(){
        this.app.route(serverType.info,(session:Session)=>{
            return game.utilsMgr.getSid(session.uid,serverType.info);
        })
    }
    createRoom(msg:{roomId:number,uidList:number[],roomType:e_roomType}){
        if(this.rooms[msg.roomId]){
            return false;
        }
        this.rooms[msg.roomId] = new Room(msg.uidList,msg.roomType);
    }
    getRoom(roomId:number){
        return this.rooms[roomId]
    }
    getRoomPlayer(uid:number,roomId?:number){
        if(!roomId){
            let session = this.getSession(uid);
            roomId = session.get("roomId")!;
        }
        let room = this.getRoom(roomId);
        if(room){
            return room.getRoomPlayer(uid);
        }
    }
    getSession(uid:number){
        let udpSession = this.udpServer.getSession(uid);
        if(udpSession){
            return udpSession
        }else{
            return game.app.getSession(uid);
        }
    }
    sendMsg(uid: number, data: I_msg, frontServer: serverType = serverType.game): void {
        let cmd = game.protoMgr.getProtoCode(data.msgHead!)
        if(cmd || cmd == 0){
            let udpSession = this.udpServer.getSession(uid);
            if(udpSession){
                udpSession.send(data)
            }else{
                let sid = game.utilsMgr.getSid(uid,frontServer);
                this.app.sendMsgByUidSid(cmd,data.msgData,[{uid:uid,sid:sid}])
            }
        }else{
            game.logMgr.error("msgHead:%s is not find",data.msgHead)
        }
    }
    onUserIn(session: Session): void {
    }
    onUserLeave(session: Session): void {
        let roomId = session.get("roomId");
        if(session.uid>0 && roomId && roomId>0){
            let player = this.getRoomPlayer(session.uid,session.get("roomId"));
            if(player){
                player.offLine();
            }
        }
    }
}