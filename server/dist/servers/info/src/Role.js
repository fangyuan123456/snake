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
}
exports.Role = Role;
