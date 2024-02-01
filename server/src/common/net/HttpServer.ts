import  express , { NextFunction, Request, Response } from "express"
import url from "url"
import * as fs from "fs";
import * as path from "path";
let app = express();
export class HttpServer{
    moudles:{[key:string]:any} = {}
    constructor(){
        this.loadMoudles();
        this.createHttpServer();
        if(game.app.serverInfo.isNeedDownLoad){
            this.createDownLoadServer();
        }
    }
    loadMoudles(){
        let moduleDir = path.join(game.utilsMgr.getAppPath(),"net/HttpHandler")
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
    createHttpServer(){
        app.all('*', (req: Request, res: Response,next:NextFunction) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Content-Type');
            res.header('Access-Control-Allow-Methods', '*');
            res.header('Content-Type', 'application/json;charset=utf-8');
            next();
        });
      
        app.post("*",this.OnGetDataHander.bind(this));
        app.listen(game.app.serverInfo.HttpPort, function () {
            console.log("应用实例，访问地址为 http://%s:%s", game.app.serverInfo.host, game.app.serverInfo.HttpPort)
        })
    }
    createDownLoadServer(){
        app.use(express.static('fileDownLoad'));
        app.get('/fileDownLoad/*',(req, res)=>{
            let pathname = url.parse(req.url).pathname!;
            let fileUrl = path.join(game.utilsMgr.getAppPath(),pathname);
            res.sendFile(fileUrl)
        })
    }
    OnGetDataHander(req: Request, res: Response){
        req.on('data',(data:any)=>{
            try{
                var _obj = null;
                var _obj=JSON.parse(data);
                if(_obj){
                    var msgHead=_obj.msgHead;
                    var msgData=_obj.msgData;
                    this.router(msgHead,msgData,res);
                }
            }catch(err){
                console.log(err);
            }
        })
        req.on("end",(err:any)=>{
            game.logMgr.debug(err);
        });
        req.on("error",(err:Error)=>{
            game.logMgr.error(err);
        });
    }
    router(msgHead:string,msgData:any,res:Response){
        let msgArr = msgHead.split("/");
        let fileName = "main"
        let funcName = msgArr[0];
        if(msgArr.length>1){
            fileName = msgArr[0];
            funcName = msgArr[1];
        }

 
        if(this.moudles[fileName]){
            let handlerName = "on"+game.utilsMgr.capitalizeFirstLetter(funcName)+"Handler";
            if(this.moudles[fileName][handlerName]){
                this.moudles[fileName][handlerName](msgData,res);
            }else{
                game.logMgr.error("funcName:%s is not exits",handlerName)
            }
        }else{
            game.logMgr.error("fileName:%s is not exits",fileName)
        }
    }
    sendMsg(msgData:any,res:Response){
        res.end(JSON.stringify(msgData));
    }
}