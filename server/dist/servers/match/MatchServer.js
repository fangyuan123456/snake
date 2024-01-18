"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchServer = void 0;
const GameServerBase_1 = require("../../common/base/GameServerBase");
const MatchConfig_1 = require("./src/MatchConfig");
class MatchServer extends GameServerBase_1.GameServerBase {
    constructor(app) {
        super(app);
        this.matchList = [];
        this.roomIdIndex = 10000;
        matchGame = this;
    }
    match(data) {
        let index = this.matchList.indexOf(data.uid);
        if (data.isMatch) {
            if (index < 0) {
                this.matchList.push(index);
            }
        }
        else {
            if (index >= 0) {
                this.matchList.splice(index, 1);
            }
        }
        this.checkMatchOkAndOpenRoom();
    }
    checkMatchOkAndOpenRoom() {
        let openRoomFunc = (matchUidList) => {
            let roomId = this.roomIdIndex++;
            let gameServer = game.app.getServerById(game.utilsMgr.getSid(roomId, "game" /* serverType.game */));
            let roomIp = game.utilsMgr.getServerIp(gameServer);
            for (let i in matchUidList) {
                let uid = matchUidList[i];
                game.app.rpc(game.utilsMgr.getSid(uid, "info" /* serverType.info */)).info.main.setRoomInfo({ uid: uid, roomId: roomId, roomIp: roomIp });
                let session = game.app.getSession(uid);
                session.send(game.protoMgr.getProtoCode("matchOk"), { roomId: roomId, roomIp: roomIp });
            }
            game.app.rpc(gameServer.id).game.main.createRoom({ roomId: roomId, uidList: matchUidList });
        };
        let num = MatchConfig_1.MatchConfig.roomGameNum;
        while (this.matchList.length >= num) {
            let matchUidList = [];
            for (let i = num - 1; i >= 0; i--) {
                let uid = this.matchList[i];
                this.matchList.splice(i, 1);
                matchUidList.push(uid);
            }
            openRoomFunc(matchUidList);
        }
    }
}
exports.MatchServer = MatchServer;
