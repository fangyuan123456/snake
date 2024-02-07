// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { PanelBase } from "../../common/base/PanelBase";
import { chatKuaiJie } from "../../common/configs/CommonCfg";
import { ROOM_TYPE } from "../../common/interface/I_Game";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ChatPanel extends PanelBase {
    start () {
        super.start();
    }
    init(){
        let chatSpArr=cc.find("btnPanel/toggle1/checkmark/bianQinScoreView/view/content",this.node).children;
        let chatTextArr=cc.find("btnPanel/toggle2/checkmark/kuaiJieYuScoreView/view/content",this.node).children;
        for(let i in chatKuaiJie){
            if(chatTextArr[i]){
                chatTextArr[i].getChildByName("chatText").getComponent(cc.Label).string=chatKuaiJie[i];
            }else{
                let _item=cc.instantiate(chatTextArr[0]);
                cc.find("btnPanel/toggle2/checkmark/kuaiJieYuScoreView/view/content",this.node).addChild(_item);
               _item.getChildByName("chatText").getComponent(cc.Label).string=chatKuaiJie[i];
            }
        }
        for(let j=chatTextArr.length-1;j>=Number(chatKuaiJie.length);j--){
            chatTextArr[j].destroy();
        }
        for(let i in chatTextArr){
             chatTextArr[i].on(cc.Node.EventType.TOUCH_END,(event)=>{
                this._btn_callBack(event,Number(i));
             },this)
        }
        for(let i in chatSpArr){
             chatTextArr[i].on(cc.Node.EventType.TOUCH_END,(event)=>{
                this._btn_callBack(event,Number(i)+100);
             },this)
        }
     }
     _btn_callBack(event,tag:number){
           let type=Math.round(tag/100)+1;
           let index=tag%100;
           let info="";
           if(type==1){
               info=chatKuaiJie[index];
           }else{
               info=index+"";
           }
           let data = {type:type,chat:info};
           this.sendChatMsg(data);
           this.closePanel()
     }
     btn_send(){
         let _str=cc.find("btnPanel/inputBox",this.node).getComponent(cc.EditBox).string;
         if(!_str||_str==""){
             game.alertMgr.showAlert("请输入内容！")
         }else{
             let type=1;
             let _string=game.utilsMgr.getWordSensitivityStr(_str);
             let info=_string;
             cc.find("btnPanel/inputBox",this.node).getComponent(cc.EditBox).string="";
             let data = {type:type,chat:info};
             this.sendChatMsg(data);
             this.closePanel()
         }
     }
     sendChatMsg(data:{type:number,chat:string}){
        if(game.roomMgr.getRoomType()==ROOM_TYPE.FIGHT){
            game.netMgr.sendSocket({msgHead:"chatroom",msgData:data});
         }else{
            //  EventManager.emit("chatroomResHander",data);
         }
     }
    // update (dt) {}
}
