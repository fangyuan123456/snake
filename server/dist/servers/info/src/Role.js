"use strict";
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
