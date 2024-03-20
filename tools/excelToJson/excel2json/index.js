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
//@ts-ignore
const xlsx = __importStar(require("node-xlsx"));
const crypto = __importStar(require("crypto"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
let argMap = {};
let argArr = process.argv;
console.log(argArr);
for (let i = 2; i < argArr.length; i += 2) {
    switch (argArr[i]) {
        case "-v":
            argMap["version"] = argArr[i + 1];
            break;
    }
}
console.log("\n");
var specailKeyList = ["var", "extable"];
let config = require("./config.json");
let inputfiles = fs.readdirSync(config.input);
let versionData = {
    version: "1.0.0",
    versionMap: {}
};
inputfiles.forEach((filename) => {
    if (filename[0] === "~") {
        return;
    }
    if (!filename.endsWith(".xlsx")) {
        return;
    }
    let intputfilepath = path.join(config.input, filename);
    let buff = fs.readFileSync(intputfilepath);
    parseBuffToJson(buff, config.output_server, config.output_client, path.basename(filename, '.xlsx'));
    console.log("---->>>", filename);
});
versionData.version = argMap["version"];
fs.writeFileSync(path.join(config.output_server, "version.json"), JSON.stringify(versionData, null, 4));
fs.writeFileSync(path.join(config.output_client, "version.json"), JSON.stringify(versionData, null, 4));
console.log("---->>>", "version");
console.log("\n");
function parseBuffToJson(buff, outputDir, outputClientDir, filename) {
    let sheets = xlsx.parse(buff, { "raw": false });
    let lists = sheets[0].data;
    if (lists.length <= 4) {
        return;
    }
    // 将对象转换为字符串
    const objString = JSON.stringify(lists);
    // 计算 MD5
    const hash = crypto.createHash('md5').update(objString).digest('hex');
    versionData.versionMap[hash] = hash;
    let keyarr = lists[1];
    let typearr = lists[2];
    for (let i = 0; i < typearr.length; i++) {
        typearr[i] = typearr[i].trim().toLowerCase();
    }
    let csArr = lists[3];
    for (let i = 0; i < csArr.length; i++) {
        csArr[i] = csArr[i].trim().toLowerCase();
    }
    let objS = {};
    let objC = {};
    for (let i = 4; i < lists.length; i++) {
        let indexId = lists[i][0];
        if (indexId === undefined) {
            continue;
        }
        let s_obj = createObj(indexId, keyarr, typearr, csArr, lists[i], true);
        objS[indexId] = s_obj;
        let c_obj = createObj(indexId, keyarr, typearr, csArr, lists[i], false);
        objC[indexId] = c_obj;
    }
    let spaceNum = 4;
    fs.writeFileSync(path.join(outputDir, filename + ".json"), JSON.stringify(objS, null, spaceNum));
    fs.writeFileSync(path.join(outputDir + "/clientCfg/", filename + ".json"), JSON.stringify(objC, null, spaceNum));
    fs.writeFileSync(path.join(outputClientDir, filename + ".json"), JSON.stringify(objC, null, spaceNum));
}
function createObj(indexId, keyarr, typearr, csArr, dataarr, isSvr) {
    let obj = {};
    for (let i = 0; i < keyarr.length; i++) {
        let can = true;
        if (isSvr) {
            can = csArr[i] === "cs" || csArr[i] === "s";
        }
        else {
            can = csArr[i] === "cs" || csArr[i] === "c";
        }
        if (can) {
            obj[keyarr[i]] = changeValue(indexId, keyarr[i], dataarr[i], typearr[i].trim());
        }
    }
    return obj;
}
function changeValue(indexId, key, value, type) {
    if (specailKeyList.indexOf(indexId) >= 0 && (type != "json" || !value)) {
        return;
    }
    if (value === undefined) {
        value = "";
    }
    if (type === "bool") {
        value = value.trim().toLowerCase();
        if (value === "0" || value == "" || value === "false") {
            return false;
        }
        else {
            return true;
        }
    }
    else if (type === "string") {
        return value;
    }
    else if (type === "float" || type === "number") {
        return Number(value) || 0;
    }
    else if (type === "int") {
        return Math.floor(Number(value) || 0);
    }
    else if (type === "json") {
        let data;
        try {
            if (specailKeyList.indexOf(indexId) >= 0) {
                data = value.split("#");
            }
            else {
                data = JSON.parse(value.trim());
            }
        }
        catch (e) {
            throw Error("not json:" + indexId + "," + key);
        }
        return data;
    }
    else {
        return value;
    }
}
function getNextVersion(versionStr) {
    let versionList = versionStr.split(".");
    let len = versionList.length;
    versionList[len - 1] = (Number(versionList[len - 1]) + 1) + "";
    let newStr = "";
    for (let i = 0; i < versionList.length; i++) {
        let appendStr = versionList[i] + ".";
        if (i == versionList.length - 1) {
            appendStr = versionList[i];
        }
        newStr += appendStr;
    }
    return newStr;
}
