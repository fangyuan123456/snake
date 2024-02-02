import { Application, Session } from "mydog";
import { GameServerBase } from "../../common/base/GameServerBase";
import { Room } from "./src/Room";
import { UdpSocketServer } from "../../common/net/UdpSocketServer";
import { serverType } from "../../common/config/CommonCfg";
import { I_msg } from "../../common/interface/ICommon";
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
    createRoom(msg:{roomId:number,uidList:number[]}){
        if(this.rooms[msg.roomId]){
            return false;
        }
        this.rooms[msg.roomId] = new Room(msg.uidList);
    }
    getRoom(roomId:number){
        return this.rooms[roomId]
    }
    getRoomPlayer(uid:number){
        let session = this.getSession(uid);
        let roomId = session.get("roomId");
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
        let player = this.getRoomPlayer(session.uid);
        if(player){
            player.onLine();
        }
    }
    onUserLeave(session: Session): void {
        let player = this.getRoomPlayer(session.uid);
        if(player){
            player.offLine();
        }
    }
}