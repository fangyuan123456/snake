"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HandlerBase_1 = __importDefault(require("../../../../common/base/HandlerBase"));
class Handler extends HandlerBase_1.default {
    constructor() {
        super();
    }
    inviteFriend(msg, session, next) {
        matchGame.inviteFriend({ uid: session.uid, isMatch: msg.isMatch, inviteKey: msg.inviteKey });
    }
    match(msg, session, next) {
        matchGame.match({ uid: session.uid, isMatch: msg.isMatch });
    }
}
exports.default = Handler;
