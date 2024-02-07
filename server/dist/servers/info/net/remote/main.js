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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RemoteBase_1 = __importDefault(require("../../../../common/base/RemoteBase"));
const IInfo_1 = require("../../../../common/interface/IInfo");
const SqlManager_1 = require("../../../../common/manager/SqlManager");
class Remote extends RemoteBase_1.default {
    constructor() {
        super();
    }
    createPlayer(role) {
        return __awaiter(this, void 0, void 0, function* () {
            infoGame.createPlayer(role.uid, role);
        });
    }
    updatePlayInviteData(uid, inviteUid) {
        let player = infoGame.getPlayer(uid);
        if (player && player.inviteReward) {
            player.inviteReward.updateInviteData(inviteUid);
        }
        else {
            game.sqlMgr.select(SqlManager_1.TableName.INVITE_REWARD, { uid: uid }).then((allData) => {
                let data = allData[0];
                if (data) {
                    let inviteUids = data.inviteUids || "";
                    let inviteData = JSON.parse(inviteUids);
                    if (inviteData.indexOf(inviteUid) < 0) {
                        inviteData.push(inviteUid);
                        game.sqlMgr.update(SqlManager_1.TableName.INVITE_REWARD, { inviteUids: inviteData }, { uid: uid });
                    }
                }
            });
        }
    }
    openRoom(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let player = infoGame.getPlayer(data.uid);
            player.setRoomInfo({ roomId: data.roomId, roomIp: data.roomIp });
            return yield this.getMatchRoleInfo({ uid: data.uid });
        });
    }
    setRoomInfo(data) {
        let player = infoGame.getPlayer(data.uid);
        player.setRoomInfo({ roomId: data.roomId, roomIp: data.roomIp });
    }
    getMatchRoleInfo(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let player = infoGame.getPlayer(data.uid);
            let roleInfo = yield player.getInfo(IInfo_1.e_InfoType.role);
            let assetInfo = yield player.getInfo(IInfo_1.e_InfoType.asset);
            return {
                uid: data.uid,
                nickName: roleInfo.nickName || "",
                avatarUrl: roleInfo.avatarUrl || "",
                rankScore: assetInfo.rankScore
            };
        });
    }
    getRoomPlayerInfo(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            let player = infoGame.getPlayer(uid);
            let roleInfo = yield player.getInfo(IInfo_1.e_InfoType.role);
            let assetInfo = yield player.getInfo(IInfo_1.e_InfoType.asset);
            return {
                roleInfo: roleInfo,
                assetInfo: assetInfo
            };
        });
    }
}
exports.default = Remote;
