import { Session } from "mydog";
import HandlerBase from "../../../../common/base/HandlerBase";
import { TableName } from "../../../../common/manager/SqlManager";
import { I_roleInfo } from "../../../../common/interface/IInfo";
import { Dic } from "../../../../common/interface/ICommon";

export default class Handler extends HandlerBase {
    constructor() {
        super();
    }
    getPlayersInfo(msg:{uids:number[]}, session: Session, next: Function){
        game.sqlMgr.selectMorePlayer(TableName.USER,msg.uids).then((data)=>{
            let playersInfo:Dic<I_roleInfo> = {};
            for(let i in data){
                playersInfo[data[i].uid] = data[i];
            }
            next({infos:playersInfo});
        })
    }
    route(msgName:string,msg: any, session: Session, next: Function){
        let player = infoGame.getPlayer(session.uid);
        if(!player){
            player = infoGame.createPlayer(session.uid)
        }
        //@ts-ignore
        let func = player[msgName]
        if(func){
            func.call(player,msg, session, next);
        }else{
            game.logMgr.error("msgName:%s is not found in Room",msgName);
        }
    }
}