"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Quip = void 0;
const SqlUpdateBase_1 = require("../../../common/base/SqlBase");
class Quip extends SqlUpdateBase_1.SqlBase {
    constructor(player, equip) {
        super("t_quip");
        this.equip = equip;
        this.player = player;
    }
    doSqlUpdate() {
        super.doSqlUpdate({ uid: this.player.uid });
    }
    update() {
    }
}
exports.Quip = Quip;
