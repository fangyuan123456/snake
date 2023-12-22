import { createApp } from "mydog";
import { serverType } from "./common/config/GameCfg";
import { LoginServer } from "./servers/login/LoginServer";
import { InfoServer } from "./servers/info/InfoServer";
import { ConnectorServer } from "./servers/connector/ConnectorServer";

let CreateServerApp=function(){
    let app = createApp();
    switch(app.serverType){
        case serverType.master:
            app.start();
        break;
        case serverType.login:
            new LoginServer(app);
        break;
        case serverType.info:
            new InfoServer(app);
        break;
        case serverType.connector:
            new ConnectorServer(app);
        break
    }
}
CreateServerApp();

// import { connector, createApp, Session } from "mydog";
// import * as fs from "fs";
// import * as path from "path";
// let app = createApp();
// app.appName = "lord of mydog";

// import { gameLog, log4js_init } from "./app/common/logger";
// log4js_init(app);

// import { msgDecode, msgEncode } from "./app/common/encode_decode";
// import { initServer, on_mydoglist_func, routeFunc } from "./app/common/serverInit";
// import { serverType } from "./app/common/someConfig";
// import { onUserIn, onUserLeave } from "./servers/connector/net/handler/main";

// if (app.env === "production") {
//     app.set("key", fs.readFileSync(path.join(__dirname, "../www.mydog.wiki.key")))
//     app.set("cert", fs.readFileSync(path.join(__dirname, "../www.mydog.wiki.pem")));
// }
// gameLog.info("initServer");
// initServer();
// app.configure(serverType.connector, routeFunc);
// app.setConfig("mydogList", on_mydoglist_func);
// app.setConfig("connector", {
//     "connector": connector.Ws,
//     "clientOnCb": onUserIn,
//     "clientOffCb": onUserLeave,
//     "interval": 50,
//     "noDelay": false,
//     "ssl": app.env === "production",
//     "key": app.get("key"),
//     "cert": app.get("cert"),
// });
// app.setConfig("rpc", { "interval": 30, "noDelay": false });
// app.setConfig("encodeDecode", { "msgDecode": msgDecode, "msgEncode": msgEncode });
// app.setConfig("logger", (level, info) => {
//     if (level !== "debug") {
//         gameLog[level](info);
//     }
// })
// app.start();

// process.on("uncaughtException", function (err: any) {
//     gameLog.error(err)
// });


