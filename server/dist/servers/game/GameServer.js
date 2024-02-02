"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameServer = void 0;
const GameServerBase_1 = require("../../common/base/GameServerBase");
const Room_1 = require("./src/Room");
const UdpSocketServer_1 = require("../../common/net/UdpSocketServer");
class GameServer extends GameServerBase_1.GameServerBase {
    constructor(app) {
        super(app);
        this.rooms = {};
        globalThis.gameGame = this;
        this.udpServer = new UdpSocketServer_1.UdpSocketServer();
    }
    createRoom(msg) {
        if (this.rooms[msg.roomId]) {
            return false;
        }
        this.rooms[msg.roomId] = new Room_1.Room(msg.uidList);
    }
    getRoom(roomId) {
        return this.rooms[roomId];
    }
    getRoomPlayer(uid) {
        let session = this.getSession(uid);
        let roomId = session.get("roomId");
        let room = this.getRoom(roomId);
        if (room) {
            return room.getRoomPlayer(uid);
        }
    }
    getSession(uid) {
        let udpSession = this.udpServer.getSession(uid);
        if (udpSession) {
            return udpSession;
        }
        else {
            return game.app.getSession(uid);
        }
    }
    sendMsg(uid, data, frontServer = "game" /* serverType.game */) {
        let cmd = game.protoMgr.getProtoCode(data.msgHead);
        if (cmd || cmd == 0) {
            let udpSession = this.udpServer.getSession(uid);
            if (udpSession) {
                udpSession.send(data);
            }
            else {
                let sid = game.utilsMgr.getSid(uid, frontServer);
                this.app.sendMsgByUidSid(cmd, data.msgData, [{ uid: uid, sid: sid }]);
            }
        }
        else {
            game.logMgr.error("msgHead:%s is not find", data.msgHead);
        }
    }
    onUserIn(session) {
        let player = this.getRoomPlayer(session.uid);
        if (player) {
            player.onLine();
        }
    }
    onUserLeave(session) {
        let player = this.getRoomPlayer(session.uid);
        if (player) {
            player.offLine();
        }
    }
}
exports.GameServer = GameServer;
