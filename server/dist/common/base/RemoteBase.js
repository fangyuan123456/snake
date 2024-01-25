"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RemoteBase {
    constructor() {
    }
    notify(uid, data) {
        let session = game.app.getSession(uid);
        let cmd = game.protoMgr.getProtoCode(data.msgHead);
        session.send(cmd, data.msgData);
    }
}
exports.default = RemoteBase;
