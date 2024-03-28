"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HandlerBase_1 = __importDefault(require("../../../../common/base/HandlerBase"));
const SqlManager_1 = require("../../../../common/manager/SqlManager");
class Handler extends HandlerBase_1.default {
    constructor() {
        super();
    }
    getPlayersInfo(msg, session, next) {
        if (msg.uids.length > 0) {
            game.sqlMgr.selectMorePlayer(SqlManager_1.TableName.USER, msg.uids).then((data) => {
                let playersInfo = {};
                for (let i in data) {
                    playersInfo[data[i].uid] = data[i];
                }
                next({ infos: playersInfo });
            });
        }
        else {
            next({ infos: {} });
        }
    }
    route(msgName, msg, session, next) {
        game.logMgr.debug(msgName);
        let player = infoGame.getPlayer(session.uid);
        if (!player) {
            player = infoGame.createPlayer(session.uid);
        }
        //@ts-ignore
        let func = player[msgName + "Handler"];
        if (func) {
            func.call(player, msg, session, next);
        }
        else {
            game.logMgr.error("msgName:%s is not found in Room", msgName);
        }
    }
}
exports.default = Handler;
