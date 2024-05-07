import { Session } from "mydog";
import HandlerBase from "../../../../common/base/HandlerBase";

export default class Handler extends HandlerBase{
    constructor() {
        super();
    }
    getRankData(msg:{type:string}, session: Session, next: Function){
        let rankDataKey = msg.type == "normalGame"?"score":"rankScore"
        next({type:msg.type,playerData:centerGame.rankDataList[rankDataKey]} )
    }
}