import { Session } from "mydog";
import HandlerBase from "../../../../common/base/HandlerBase";

export default class Handler extends HandlerBase{
    constructor() {
        super();
    }
    test(msg: { "test1": string}, session: Session, next: Function){
        next({test1:session.uid+""})
    }
}