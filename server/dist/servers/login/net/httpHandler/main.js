"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Handler {
    constructor() {
    }
    onLoginHandler(msgData, res) {
        game.httpMgr.sendMsg({
            uid: 111
        }, res);
    }
}
exports.default = Handler;
