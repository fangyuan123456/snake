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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpManager = void 0;
const SingleBase_1 = require("../base/SingleBase");
const express_1 = __importDefault(require("express"));
const url_1 = __importDefault(require("url"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
let app = (0, express_1.default)();
class HttpManager extends SingleBase_1.SingleBase {
    constructor() {
        super();
        this.moudles = {};
        this.loadMoudles();
        this.createHttpServer();
    }
    loadMoudles() {
        let moduleDir = path.join(game.utilsMgr.getAppPath(), "net/HttpHandler");
        let exists = fs.existsSync(moduleDir);
        if (exists) {
            fs.readdirSync(moduleDir).forEach((filename) => {
                if (!filename.endsWith(".js")) {
                    return;
                }
                let name = path.basename(filename, '.js');
                let handler = require(path.join(moduleDir, filename));
                if (handler.default) {
                    this.moudles[name] = new handler.default();
                }
            });
        }
    }
    createHttpServer() {
        app.all('*', (req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Content-Type');
            res.header('Access-Control-Allow-Methods', '*');
            res.header('Content-Type', 'application/json;charset=utf-8');
            next();
        });
        app.get('/img', this.OnGetImageHander.bind(this));
        app.post("/data", this.OnGetDataHander.bind(this));
        app.listen(game.app.serverInfo.HttpPort, function () {
            console.log("应用实例，访问地址为 http://%s:%s", game.app.serverInfo.host, game.app.serverInfo.HttpPort);
        });
    }
    OnGetImageHander(req, res) {
        let pathname = url_1.default.parse(req.url).pathname;
        res.sendFile(game.utilsMgr.getAppPath() + "/fileDownLoad/" + pathname);
    }
    OnGetDataHander(req, res) {
        let pathname = url_1.default.parse(req.url).pathname;
        req.on('data', (data) => {
            try {
                var _obj = null;
                var _obj = JSON.parse(data);
                if (_obj) {
                    var msgHead = _obj.msgHead;
                    var msgData = _obj.msgData;
                    this.router(pathname, msgHead, msgData, res);
                }
            }
            catch (err) {
                console.log(err);
            }
        });
        req.on("end", (err) => {
            game.logMgr.debug(err);
        });
        req.on("error", (err) => {
            game.logMgr.error(err);
        });
    }
    router(pathUrl, msgHead, msgData, res) {
        let fileName = "main";
        if (pathUrl) {
            fileName = pathUrl;
        }
        if (this.moudles[fileName]) {
            let handlerName = "on" + game.utilsMgr.capitalizeFirstLetter(msgHead) + "Handler";
            if (this.moudles[fileName][handlerName]) {
                this.moudles[fileName][handlerName](msgData, res);
            }
            else {
                game.logMgr.error("funcName:%s is not exits", handlerName);
            }
        }
        else {
            game.logMgr.error("fileName:%s is not exits", fileName);
        }
    }
}
exports.HttpManager = HttpManager;
