import { Session } from "mydog";
import HandlerBase from "../../../../common/base/HandlerBase";

export default class Handler extends HandlerBase {
    constructor() {
        super();
    }
    match(msg: {isMatch:boolean}, session: Session, next: Function){
        matchGame.match({uid:session.uid,isMatch:msg.isMatch});
        next({uid:session.uid,isMatch:msg.isMatch})
    }
}