import { Session } from "mydog";

export default class Handler {
    constructor() {
    }
    route(msgName: string, msg: any, session: Session, next: Function) {
        next({type:msg.type,playerData:centerGame.rankDataList[msg.type]} )
    }
}