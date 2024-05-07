declare global {
    interface Rpc {
        match: {
            main: Remote,
        }
    }
}
export default class Remote {
    onUserLeave(uid:number){
        matchGame.userLeave(uid);
    }
}