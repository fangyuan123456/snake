import { SocketType } from "../Game";
import { SingleBase } from "../base/SingleBase";
import { KICKUSER_TYPE, pushMsgType } from "../configs/CommonCfg";

export class PushMsgManager extends SingleBase{
    constructor(){
        super();
        game.netMgr.onMsg("pushMsg",this.onPushMsg.bind(this));
        game.netMgr.onMsg("kickUser",this.onKickUser.bind(this));
    }
    getTiShiBoxCallDataByMsgType(msgType:pushMsgType){
        switch(msgType){
            case pushMsgType.KICK_ROOM:
                return {
                    text:"确定"
                }
            break;
        }
    }
    onPushMsg(data:{msgText:string,msgType?:pushMsgType}){
        let callData = this.getTiShiBoxCallDataByMsgType(data.msgType)
        game.alertMgr.showTiShiBox({content:data.msgText,btnCallBackList:[
            callData || {text:"确定"}
        ]})
    }
    onKickUser(data:{kickType:KICKUSER_TYPE}){
        if(data.kickType == KICKUSER_TYPE.REMOTE_LOGININ){
            game.netMgr.socketMap[SocketType.center].close(true);
            game.alertMgr.showTiShiBox({content:"异地登陆,是否重连",btnCallBackList:[
                {text:"确定",callBack:()=>{
                    game.netMgr.socketMap[SocketType.center].isNeedReConnect = true;
                    game.netMgr.socketMap[SocketType.center].connect();
                }}
            ]})
        }

    }
}