import { Session } from "mydog";

export default class Handler {
    constructor() {
    }
    route(msgName: string, msg: any, session: Session, next: Function) {
        game.logMgr.debug(msgName);
        game.callSystemHandler(msgName, msg, session, next);
    }
}