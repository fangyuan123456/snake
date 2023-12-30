"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Remote {
    constructor() {
    }
    getClientNum(cb) {
        cb(0, game.app.clientNum);
    }
}
exports.default = Remote;
