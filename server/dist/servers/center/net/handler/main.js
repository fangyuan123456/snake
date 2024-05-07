"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Handler {
    constructor() {
    }
    route(msgName, msg, session, next) {
        game.logMgr.debug(msgName);
        game.callSystemHandler(msgName, msg, session, next);
    }
}
exports.default = Handler;
