import { Session } from "mydog";

export default class Handler {
    constructor() {
    }
    test(msg: { "test1": string}, session: Session, next: Function){
        next({test1:session.uid+""})
    }
}