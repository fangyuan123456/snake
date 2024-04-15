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
class Remote {
    constructor() {
    }
    userRegister(openId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield infoGame.userRegister(openId);
        });
    }
    onUserIn(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield infoGame.userLoginIn(uid);
        });
    }
    onUserLeave(uid) {
        infoGame.userLoginOut(uid);
    }
    getPlayerInfo(uid, infoKeyList) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield infoGame.getPlayerInfo(uid, infoKeyList);
        });
    }
    getOnceInfo(uid, infoKeyList) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield infoGame.getOnceInfo(uid, infoKeyList);
        });
    }
    setPlayerInfo(uid, info) {
        infoGame.setPlayerInfo(uid, info);
        infoGame.notifySetInfo(uid, info);
    }
}
exports.default = Remote;
