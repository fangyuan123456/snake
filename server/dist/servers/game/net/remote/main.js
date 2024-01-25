"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RemoteBase_1 = __importDefault(require("../../../../common/base/RemoteBase"));
class Remote extends RemoteBase_1.default {
    constructor() {
        super();
    }
    createRoom(msg) {
        gameGame.createRoom(msg);
    }
}
exports.default = Remote;
