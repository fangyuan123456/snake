"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameServer = void 0;
const mydog_1 = require("mydog");
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
    setConfig() {
        super.setConfig();
        let cert = this.getCert();
        this.app.setConfig("mydogList", this.mydogList);
        this.app.setConfig("connector", {
            "connector": mydog_1.connector.Ws,
            "clientOnCb": this.onUserIn.bind(this),
            "clientOffCb": this.onUserLeave.bind(this),
            "interval": 50,
            "noDelay": false,
            "ssl": this.app.env === "production",
            "key": cert.key,
            "cert": cert.cert,
            "heartbeat": 10000
        });
        this.app.configure("center" /* serverType.center */, this.route.bind(this));
    }
    route() {
        this.app.route("info" /* serverType.info */, (session) => {
            return game.utilsMgr.getSid(session.uid, "info" /* serverType.info */);
        });
    }
    createRoom(msg) {
        if (this.rooms[msg.roomId]) {
            return false;
        }
        this.rooms[msg.roomId] = new Room_1.Room(msg.uidList, msg.roomType);
    }
    getRoom(roomId) {
        return this.rooms[roomId];
    }
    getRoomPlayer(uid, roomId) {
        if (!roomId) {
            let session = this.getSession(uid);
            roomId = session.get("roomId");
        }
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
                this.app.sendMsgByUid(cmd, data.msgData, [uid]);
            }
        }
        else {
            game.logMgr.error("msgHead:%s is not find", data.msgHead);
        }
    }
    onUserIn(session) {
    }
    onUserLeave(session) {
        let roomId = session.get("roomId");
        if (session.uid > 0 && roomId && roomId > 0) {
            let player = this.getRoomPlayer(session.uid, session.get("roomId"));
            if (player) {
                player.offLine();
            }
        }
    }
}
exports.GameServer = GameServer;
