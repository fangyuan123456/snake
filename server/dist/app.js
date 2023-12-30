"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mydog_1 = require("mydog");
const LoginServer_1 = require("./servers/login/LoginServer");
const InfoServer_1 = require("./servers/info/InfoServer");
const CenterServer_1 = require("./servers/center/CenterServer");
let CreateServerApp = function () {
    let app = (0, mydog_1.createApp)();
    switch (app.serverType) {
        case "master" /* serverType.master */:
            app.start();
            break;
        case "login" /* serverType.login */:
            new LoginServer_1.LoginServer(app);
            break;
        case "info" /* serverType.info */:
            new InfoServer_1.InfoServer(app);
            break;
        case "center" /* serverType.center */:
            new CenterServer_1.CenterServer(app);
            break;
    }
};
CreateServerApp();
