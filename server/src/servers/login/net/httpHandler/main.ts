import { Response } from "express";
export default class Handler {
    constructor() {
    }
    onLoginHandler(msgData:any,res:Response){
        game.httpMgr!.sendMsg({
            url:game.svrNumComp?.getMinSvrIp()
        },res);
        game.platformMgr.getLoginCode(msgData.platform,(data)=>{
            this.registerAndLogin(data,(data)=>{
                res.end(data);
            });
        });
    }
    registerAndLogin(data:any,callBack:(data:any)=>void){
        
    }
}