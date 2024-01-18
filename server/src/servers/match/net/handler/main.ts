import { Session } from "mydog";

export default class Handler {
    constructor() {
    }
    match(msg: {isMatch:boolean}, session: Session, next: Function){
        matchGame.match({uid:session.uid,isMatch:msg.isMatch});
        next({uid:session.uid,isMatch:msg.isMatch})
    }
}