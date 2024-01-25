import { SingleBase } from "../base/SingleBase";
import { pushMsgType } from "../configs/CommonCfg";

export class PushMsgManager extends SingleBase{
    constructor(){
        super();
        game.netMgr.onMsg("pushMsg",this.onPushMsg.bind(this));
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
}