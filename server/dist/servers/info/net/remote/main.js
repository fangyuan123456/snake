"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Remote {
    constructor() {
    }
    createPlayer(uid) {
        let infoGame = game;
        infoGame.createPlayer(uid);
    }
}
exports.default = Remote;
