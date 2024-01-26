"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InviteReward = void 0;
const SqlBase_1 = require("../../../common/base/SqlBase");
const SqlManager_1 = require("../../../common/manager/SqlManager");
class InviteReward extends SqlBase_1.SqlBase {
    constructor(player, inviteReward) {
        super(SqlManager_1.TableName.INVITE_REWARD, { uid: player.uid });
        this.defaultItems = {
            inviteUids: [],
            getRewardIndexs: []
        };
        this.whileUpdateSqlKeyMap = {};
        this.data = inviteReward;
        this.player = player;
    }
    updateInviteData(inviteUid) {
        let data = this.data;
        if (data) {
            data.inviteUids = data.inviteUids || [];
            if (data.inviteUids.indexOf(inviteUid) >= 0) {
                return;
            }
            data.inviteUids.push(inviteUid);
        }
        this.update({ inviteUids: data.inviteUids });
        game.sendMsg(this.player.uid, { msgHead: "getInviteRewardInfo", msgData: this.data });
    }
    getInviteReward() {
    }
}
exports.InviteReward = InviteReward;
