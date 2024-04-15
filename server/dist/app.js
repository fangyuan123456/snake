"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mydog_1 = require("mydog");
const LoginServer_1 = require("./servers/login/LoginServer");
const InfoServer_1 = require("./servers/info/InfoServer");
const CenterServer_1 = require("./servers/center/CenterServer");
const MatchServer_1 = require("./servers/match/MatchServer");
const GameServer_1 = require("./servers/game/GameServer");
const ConnectorServer_1 = require("./servers/connector/ConnectorServer");
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
        case "connector" /* serverType.connector */:
            new ConnectorServer_1.ConnectorServer(app);
            break;
        case "center" /* serverType.center */:
            new CenterServer_1.CenterServer(app);
            break;
        case "match" /* serverType.match */:
            new MatchServer_1.MatchServer(app);
            break;
        case "game" /* serverType.game */:
            new GameServer_1.GameServer(app);
            break;
    }
};
CreateServerApp();
