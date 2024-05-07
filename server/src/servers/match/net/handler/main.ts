import { Session } from "mydog";

export default class Handler {
    inviteFriend(msg:{inviteKey:string,isMatch:boolean},session:Session,next:Function){
        matchGame.inviteFriend({uid:session.uid,isMatch:msg.isMatch,inviteKey:msg.inviteKey})
    }
    match(msg: {isMatch:boolean}, session: Session, next: Function){
        matchGame.match({uid:session.uid,isMatch:msg.isMatch});
    }
    async getRoomInfo(msg: any, session: Session, next: Function) {
        next(matchGame.getRoomInfo(session.uid));
    }
}