import { Session } from "mydog";
import HandlerBase from "../../../../common/base/HandlerBase";

export default class Handler extends HandlerBase{
    constructor() {
        super();
    }
    getRankData(msg:{type:string}, session: Session, next: Function){
        next({type:msg.type,playerData:centerGame.rankDataList[msg.type]} )
    }
}