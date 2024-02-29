"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MSG_TYPE = void 0;
var MSG_TYPE;
(function (MSG_TYPE) {
    MSG_TYPE[MSG_TYPE["msg"] = 1] = "msg";
    MSG_TYPE[MSG_TYPE["handshake"] = 2] = "handshake";
    MSG_TYPE[MSG_TYPE["heartbeat"] = 3] = "heartbeat";
})(MSG_TYPE = exports.MSG_TYPE || (exports.MSG_TYPE = {}));
