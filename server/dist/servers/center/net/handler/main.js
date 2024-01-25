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
    test(msg, session, next) {
        next({ test1: session.uid + "" });
    }
}
exports.default = Handler;
