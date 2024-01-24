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
exports.Role = void 0;
const SqlBase_1 = require("../../../common/base/SqlBase");
const SqlManager_1 = require("../../../common/manager/SqlManager");
class Role extends SqlBase_1.SqlBase {
    constructor(player, role) {
        super(SqlManager_1.TableName.USER, { uid: player.uid });
        this.data = role;
        this.player = player;
    }
    getInfo() {
        return new Promise((resolve, reject) => {
            resolve(this.data);
        });
    }
    init() {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            resolve(this.data);
        }));
    }
    updateInviteData(inviteUid) {
        let role = this.data;
        if (role) {
            role.inviteUids = role.inviteUids || "";
            if (role.inviteUids == "") {
                role.inviteUids += inviteUid;
            }
            else {
                role.inviteUids += "#" + inviteUid;
            }
        }
        this.update({ inviteUids: role.inviteUids });
        let session = game.app.getSession(this.player.uid);
        session.send(game.protoMgr.getProtoCode("getRoleInfo"), this.data);
    }
}
exports.Role = Role;
