"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mydog_send = exports.mydog_cmd = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
/** 接收 mydog cmd 命令 */
function mydog_cmd(lans, cmdObjArr) {
    // console.log(lans, cmdObjArr);
    // if (lans.includes("ts")) {
    let endStr = 'export const enum cmd {\n';
    for (let one of cmdObjArr) {
        if (one.note) {
            endStr += `\t/**\n\t * ${one.note}\n\t */\n`;
        }
        let oneStr = one.cmd;
        if (one.cmd.indexOf('.') !== -1) {
            let tmpArr = one.cmd.split('.');
            oneStr = tmpArr[0] + '_' + tmpArr[1] + '_' + tmpArr[2];
        }
        endStr += `\t${oneStr} = "${one.cmd}",\n`;
    }
    endStr += '}';
    fs.writeFileSync(path.join(__dirname, "../../mmo_client/assets/scripts/common/cmdClient.ts"), endStr);
    // }
}
exports.mydog_cmd = mydog_cmd;
/** 接收 mydog send 命令的消息回调 */
function mydog_send(reqArgv, timeoutIds, data) {
    console.log(data);
}
exports.mydog_send = mydog_send;
