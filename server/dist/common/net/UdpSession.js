"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UdpSession = void 0;
class UdpSession {
    constructor(uid, ip) {
        this.dics = {};
        this.uid = uid;
        this.ip = ip;
    }
    set(value) {
        this.dics = game.utilsMgr.merge(this.dics, value);
    }
    ;
    get(key) {
        return this.dics[key];
    }
    ;
    bind(uid) {
        this.uid = uid;
        return true;
    }
    ;
    getIp() {
        return this.ip;
    }
    send(msg) {
        gameGame.udpServer.send(msg, this.ip);
    }
    ;
}
exports.UdpSession = UdpSession;
