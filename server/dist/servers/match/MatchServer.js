"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchServer = void 0;
const GameServerBase_1 = require("../../common/base/GameServerBase");
const MatchConfig_1 = require("./src/MatchConfig");
const IGame_1 = require("../../common/interface/IGame");
class MatchServer extends GameServerBase_1.GameServerBase {
    constructor(app) {
        super(app);
        this.matchList = [];
        this.inviteRoom = {};
        this.playerRoomIdInfo = {};
        this.roomIdIndex = 10000;
        this.inviteRoomIndex = 1;
        globalThis.matchGame = this;
    }
    inviteFriend(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let inviteKey = "";
            if (!data.inviteKey) {
                for (let i in this.inviteRoom) {
                    for (let j in this.inviteRoom[i]) {
                        if (this.inviteRoom[i][j].uid == data.uid) {
                            inviteKey = i;
                            break;
                        }
                    }
                    if (inviteKey)
                        break;
                }
            }
            else {
                inviteKey = data.inviteKey;
            }
            let getRoleIndexFunc = (uid) => {
                let roles = this.inviteRoom[inviteKey];
                for (let i in roles) {
                    if (roles[i].uid == uid) {
                        return Number(i);
                    }
                }
            };
            let getUids = () => {
                let uids = [];
                let roles = this.inviteRoom[inviteKey];
                for (let i in roles) {
                    uids.push(roles[i].uid);
                }
                return uids;
            };
            let openRoomFunc = (matchUidList) => __awaiter(this, void 0, void 0, function* () {
                let roomId = this.inviteRoomIndex++;
                let gameServer = game.app.getServerById(game.utilsMgr.getSid(roomId, "game" /* serverType.game */));
                let roomIp = game.utilsMgr.getServerIp(gameServer);
                for (let i in matchUidList) {
                    let uid = matchUidList[i];
                    this.playerRoomIdInfo[uid] = { roomId: roomId, roomIp: roomIp };
                }
                game.app.rpc(gameServer.id).game.main.createRoom({ roomId: roomId, uidList: matchUidList, roomType: IGame_1.e_roomType.FRIEND });
                game.sendMsg(matchUidList, { msgHead: "getRoomInfo", msgData: { roomId: roomId, roomIp: roomIp } });
            });
            if (inviteKey && inviteKey != "") {
                this.inviteRoom[inviteKey] = this.inviteRoom[inviteKey] || [];
                let index = getRoleIndexFunc(data.uid);
                if (data.isMatch) {
                    if (!index) {
                        let roleInfo = yield game.infoMgr.getInfoByBundle(data.uid, "matchRoleInfo");
                        this.inviteRoom[inviteKey].push(roleInfo);
                    }
                }
                else {
                    if (index) {
                        this.inviteRoom[inviteKey].splice(index, 1);
                    }
                }
                let uids = getUids();
                let playerLen = uids.length;
                let isStart = playerLen == MatchConfig_1.MatchConfig.roomGameNum;
                game.sendMsg(getUids(), { msgHead: "InviteFriend", msgData: { roles: this.inviteRoom[inviteKey], isStart: isStart } });
                if (isStart) {
                    openRoomFunc(uids);
                    delete this.inviteRoom[inviteKey];
                }
            }
        });
    }
    setConfig() {
        super.setConfig();
    }
    match(data) {
        let checkMatchOkAndOpenRoom = () => {
            let openRoomFunc = (matchUidList) => __awaiter(this, void 0, void 0, function* () {
                let roomId = this.roomIdIndex++;
                let gameServer = game.app.getServerById(game.utilsMgr.getSid(roomId, "game" /* serverType.game */));
                let roomIp = game.utilsMgr.getServerIp(gameServer);
                let roles = [];
                for (let i in matchUidList) {
                    let uid = matchUidList[i];
                    let roleInfo = yield game.infoMgr.getInfoByBundle(uid, "matchRoleInfo");
                    roles.push(roleInfo);
                    this.playerRoomIdInfo[uid] = { roomId: roomId, roomIp: roomIp };
                }
                game.app.rpc(gameServer.id).game.main.createRoom({ roomId: roomId, uidList: matchUidList, roomType: IGame_1.e_roomType.FRIEND });
                game.sendMsg(matchUidList, { msgHead: "match", msgData: { roles: roles } });
                game.sendMsg(matchUidList, { msgHead: "getRoomInfo", msgData: { roomId: roomId, roomIp: roomIp } });
            });
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
        };
        let index = this.matchList.indexOf(data.uid);
        if (data.isMatch) {
            if (index < 0) {
                this.matchList.push(data.uid);
            }
        }
        else {
            if (index >= 0) {
                this.matchList.splice(index, 1);
            }
        }
        checkMatchOkAndOpenRoom();
    }
    getRoomInfo(uid) {
        return this.playerRoomIdInfo[uid] || { roomId: 0, roomIp: "" };
    }
    userLeave(uid) {
        let index = this.matchList.indexOf(uid);
        if (index >= 0) {
            this.match({ uid: uid, isMatch: false });
        }
        else {
            this.inviteFriend({ uid: uid, isMatch: false });
        }
    }
}
exports.MatchServer = MatchServer;
