"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const InfoConfig_1 = require("../../src/InfoConfig");
class Handler {
    constructor() {
    }
    getRoleInfo(msg, session, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let uid = session.uid;
            let roleInfo = yield game.infoMgr.getInfoByBundle(uid, InfoConfig_1.e_InfoBundle.getRoleInfo);
            next(roleInfo);
        });
    }
    getAssetInfo(msg, session, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let uid = session.uid;
            let roleInfo = yield game.infoMgr.getInfoByBundle(uid, InfoConfig_1.e_InfoBundle.getAssetInfo);
            next(roleInfo);
        });
    }
    getInviteRewardInfo(msg, session, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let uid = session.uid;
            let roleInfo = yield game.infoMgr.getInfoByBundle(uid, InfoConfig_1.e_InfoBundle.getInviteRewardInfo);
            next(roleInfo);
        });
    }
    getScoreInfo(msg, session, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let uid = session.uid;
            let roleInfo = yield game.infoMgr.getInfoByBundle(uid, InfoConfig_1.e_InfoBundle.getScoreInfo);
            next(roleInfo);
        });
    }
}
exports.default = Handler;
