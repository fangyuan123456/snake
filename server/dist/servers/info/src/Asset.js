"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Asset = void 0;
const SqlBase_1 = require("../../../common/base/SqlBase");
const SqlManager_1 = require("../../../common/manager/SqlManager");
class Asset extends SqlBase_1.SqlBase {
    constructor(player, asset) {
        super(SqlManager_1.TableName.ASSET, { uid: player.uid });
        this.defaultItems = {
            items: {
                1: {
                    num: 2
                },
                2: {
                    num: 2
                }
            }
        };
        this.whileUpdateSqlKeyMap = {};
        this.data = asset;
        this.player = player;
    }
    update() {
    }
}
exports.Asset = Asset;
