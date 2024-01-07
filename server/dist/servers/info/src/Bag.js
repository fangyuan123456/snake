"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bag = void 0;
const SqlUpdateBase_1 = require("../../../common/base/SqlBase");
class Bag extends SqlUpdateBase_1.SqlBase {
    constructor(player, items) {
        super("t_bag");
        this.whileUpdateSqlKeyMap = {};
        this.player = player;
        this.items = items;
    }
    change(msg) {
    }
    doSqlUpdate() {
        super.doSqlUpdate({ uid: this.player.uid });
    }
    update() {
    }
}
exports.Bag = Bag;
