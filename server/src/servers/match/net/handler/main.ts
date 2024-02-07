import { Session } from "mydog";
import HandlerBase from "../../../../common/base/HandlerBase";

export default class Handler extends HandlerBase {
    constructor() {
        super();
    }
    inviteFriend(msg:{inviteKey:string,isMatch:boolean},session:Session,next:Function){
        matchGame.inviteFriend({uid:session.uid,isMatch:msg.isMatch,inviteKey:msg.inviteKey})
    }
    match(msg: {isMatch:boolean}, session: Session, next: Function){
        matchGame.match({uid:session.uid,isMatch:msg.isMatch});
    }
}