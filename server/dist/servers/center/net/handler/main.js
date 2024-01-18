"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Handler {
    constructor() {
    }
    test(msg, session, next) {
        next({ test1: session.uid + "" });
    }
}
exports.default = Handler;
