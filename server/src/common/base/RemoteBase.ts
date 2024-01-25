export default class RemoteBase {
    constructor() {
    }
    notify(uid:number,data:{msgHead:string,msgData:any}){
        let session = game.app.getSession(uid);
        let cmd = game.protoMgr.getProtoCode(data.msgHead)!
        session.send(cmd,data.msgData);
    }
}