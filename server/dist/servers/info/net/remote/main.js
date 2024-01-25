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
    setRoomInfo(data) {
        let player = infoGame.getPlayer(data.uid);
        if (player) {
            player.setRoomInfo({ roomId: data.roomId, roomIp: data.roomIp });
        }
    }
    updatePlayInviteData(uid, inviteUid) {
        let player = infoGame.getPlayer(uid);
        if (player) {
            player.updateInviteData(inviteUid);
        }
        else {
            game.sqlMgr.select(SqlManager_1.TableName.USER, { uid: uid }).then((data) => {
                let inviteUids = data.inviteUids || "";
                if (inviteUids == "") {
                    inviteUids += inviteUid;
                }
                else {
                    inviteUids += "#" + inviteUid;
                }
                game.sqlMgr.update(SqlManager_1.TableName.USER, { inviteUids: inviteUids }, { uid: uid });
            });
        }
    }
    getRoomPlayerInfo(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            let player = infoGame.getPlayer(uid);
            return {
                roleInfo: player.role
            };
        });
    }
}
exports.default = Remote;
