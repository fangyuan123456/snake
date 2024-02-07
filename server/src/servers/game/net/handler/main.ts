import { Session } from "mydog";
import HandlerBase from "../../../../common/base/HandlerBase";
import { UdpSession } from "../../../../common/net/UdpSession";

export default class Handler extends HandlerBase {
    constructor() {
        super();
    }
    enterRoom(msg: any, session: Session|UdpSession, next: Function){
        this.route("enterRoom",msg,session,next);
    }
    route(msgName:string,msg: any, session: Session|UdpSession, next: Function){
        let roomId = session.get("roomId");
        let room = gameGame.getRoom(roomId);
        if(room){
            //@ts-ignore
            let func = room[msgName+"Handler"]
            if(func){
                func.call(room,msg, session, next);
            }else{
                game.logMgr.error("msgName:%s is not found in Room",msgName);
            }
        }
    }
}