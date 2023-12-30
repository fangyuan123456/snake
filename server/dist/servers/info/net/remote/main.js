"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Remote {
    constructor() {
    }
    getInfo(uid) {
        let infoGame = game;
        return infoGame.getInfoData(uid);
    }
}
exports.default = Remote;
