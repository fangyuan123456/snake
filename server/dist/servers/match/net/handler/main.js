"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Handler {
    constructor() {
    }
    match(msg, session, next) {
        matchGame.match({ uid: session.uid, isMatch: msg.isMatch });
        next({ uid: session.uid, isMatch: msg.isMatch });
    }
}
exports.default = Handler;
