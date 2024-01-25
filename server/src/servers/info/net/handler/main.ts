import { Session } from "mydog";

export default class Handler {
    constructor() {
    }
    route(msgName:string,msg: any, session: Session, next: Function){
        let player = infoGame.getPlayer(session.uid);
        //@ts-ignore
        let func = player[msgName]
        if(func){
            func.call(player,msg, session, next);
        }else{
            game.logMgr.error("msgName:%s is not found in Room",msgName);
        }
    }
}