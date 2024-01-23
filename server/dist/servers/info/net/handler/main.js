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
const IInfo_1 = require("../../../../common/interface/IInfo");
class Handler {
    constructor() {
    }
    getRoomInfo(msg, session, next) {
        let player = infoGame.getPlayer(session.uid);
        if (player) {
            let roomInfo = player.getRoomInfo();
            if (roomInfo) {
                next({ roomId: roomInfo.roomId, roomIp: roomInfo.roomIp });
                return;
            }
        }
        next({ roomId: 0, roomIp: "" });
    }
    getAssetInfo(msg, session, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let player = infoGame.getPlayer(session.uid);
            if (player) {
                let playerInfo = yield player.getInfo(IInfo_1.e_InfoType.asset);
                next(playerInfo);
            }
        });
    }
}
exports.default = Handler;
