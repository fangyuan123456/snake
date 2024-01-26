// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { PanelBase } from "../../common/base/PanelBase";

const {ccclass, property} = cc._decorator;

@ccclass
export default class InviteReworldPanel extends PanelBase {
    start () {
        super.start();
        this.initPlayerPanel();
        this.initReWorldPanel();

    }
    // _setReworldDataArr(){
    //     var _configData=this.configData.InviteReworldConfig;
    //     var _isGetArr=GameData.assestInfo.getInviteReworldIndex==""?[]:GameData.assestInfo.getInviteReworldIndex.split(",");
    //     this._reworldDataArr=_configData.slice(0);
    //     for(var i in this._reworldDataArr){
    //         this._reworldDataArr[i].isGetReworld=_isGetArr[i]||"0";
    //         this._reworldDataArr[i].index=i;
    //     }
    //     var _haveGetArr=[];
    //     for(var i=0;i<this._reworldDataArr.length;i++){
    //         if(this._reworldDataArr[i].isGetReworld=="1"){
    //             _haveGetArr.push(this._reworldDataArr[i]);
    //             this._reworldDataArr.splice(i,1);
    //             i--;
    //         }
    //     }
    //     this._reworldDataArr=this._reworldDataArr.concat(_haveGetArr);
    // }
    // _initPlayerPanel(){
    //     var playerArr=this.configData.player;
    //     var playerNodeArr=cc.find("panel/bg/playerPanel/view/content",this.node).children;
    //     for(var i=0;i<playerNodeArr.length;i++){
    //         if(i<6){
    //             var icon=cc.find("iconBg/mask/icon",playerNodeArr[i]);
    //             icon.getComponent(cc.Sprite).spriteFrame=null;
    //             if(!playerArr[i]){
    //                 playerNodeArr[i].on(cc.Node.EventType.TOUCH_END,this.btn_share.bind(this));
    //             }
    //         }else{
    //             playerNodeArr.splice(i,1);
    //             i--;
    //         }
    //     }
    //     for(var i in playerArr){
    //         var _node=playerNodeArr[i];
    //         if(!_node){
    //             _node=cc.instantiate(playerNodeArr[0]);
    //             cc.find("panel/bg/playerPanel/view/content",this.node).addChild(_node);
    //         }
    //         var icon=cc.find("iconBg/mask/icon",_node);
    //         GlobalScript.loadHttpIcon(icon,playerArr[i].avatarUrl);
    //     }
    // }
    // btn_share(){
    //     WxApiManager.shareToWx("真的不一样的方块决斗,赶紧来体验吧!");
    // }
    // _initReWorldPanel(){
    //     var inviteNum=this.configData.player.length;
    //     cc.find("panel/bg/inviteNumPanel/inviteNum",this.node).getComponent(cc.Label).string=inviteNum;
    //     var rewroldNodeArr=cc.find("panel/bg/reworldPanel/view/content",this.node).children;
    //     for(var i=0;i<rewroldNodeArr.length;i++){
    //         var _data=this._reworldDataArr[i];
    //         if(!_data){
    //             rewroldNodeArr.splice(i,1);
    //             i--;
    //         }
    //     }
    //     for(var i in this._reworldDataArr){
    //         var _item=rewroldNodeArr[i];
    //         if(!_item){
    //             _item=cc.instantiate(rewroldNodeArr[0]);
    //             cc.find("panel/bg/reworldPanel/view/content",this.node).addChild(_item);
    //         }
    //         _item._tag=i;
    //         _item.active=true;
    //         cc.find("btn",_item).on(cc.Node.EventType.TOUCH_END,this.btn_getReworld.bind(this));
    //     }

    //     for(var i in this._reworldDataArr){
    //         var _data=this._reworldDataArr[i];
    //         var _item=rewroldNodeArr[i];
    //         cc.find("numLabel",_item).getComponent(cc.Label).string=inviteNum+"/"+_data.inviteNum;
    //         var _str="";
    //         cc.find("rewroldBg",_item).active=false;
    //         cc.find("propPanel",_item).active=false;
    //         var itemIndex=0;
    //         for(var j in this._reworldDataArr[i].prop){
    //             _str=this._reworldDataArr[i].prop[j].num;
    //             if(j>2){
    //                 cc.find("propPanel",_item).active=true;
    //                 var propNodeArr=cc.find("propPanel",_item).children;
    //                 var item=propNodeArr[itemIndex];
    //                 if(!item){
    //                     item=cc.instantiate(propNodeArr[0])
    //                     cc.find("propPanel",_item).addChild(item)
    //                 }
    //                 GlobalScript.loadSp(cc.find("sp",item),"loadRes/propPic/prop"+j);
    //                 cc.find("num",item).getComponent(cc.Label).string=_str;
    //                 itemIndex++;
    //             }else{
    //                 cc.find("rewroldBg",_item).active=true;
    //                 GlobalScript.loadSp(cc.find("rewroldBg/rewroldIcon",_item),"loadRes/propPic/prop"+j);
    //                 cc.find("rewroldBg/reworldNum",_item).getComponent(cc.Label).string=_str;
    //             }
    //         }
    //         for(var j in this._reworldDataArr[i].havePiFu){
    //             GlobalScript.loadSp(cc.find("rewroldBg/rewroldIcon",_item),"loadRes/piFuPic/piFu"+j);
    //             cc.find("rewroldBg/reworldNum",_item).getComponent(cc.Label).string=_str;
    //         }
    //         cc.find("btn/state1",_item).active=false;
    //         cc.find("btn/state2",_item).active=false;
    //         cc.find("btn/state3",_item).active=false;
    //         if(inviteNum<_data.inviteNum){
    //             cc.find("btn",_item).getComponent(cc.Button).interactable=false;
    //             cc.find("btn/state2",_item).active=true;
    //         }else{
    //             if(_data.isGetReworld=="1"){
    //                 cc.find("btn/state3",_item).active=true;
    //                 cc.find("btn",_item).getComponent(cc.Button).interactable=false;
    //             }else{
    //                 cc.find("btn/state1",_item).active=true;
    //                 cc.find("btn",_item).getComponent(cc.Button).interactable=true;
    //             }
    //         }
    //     }
    // }
    // btn_close(){
    //     this._destroy();
    // }
    // btn_getReworld(event){
    //     var _index=event.currentTarget.parent._tag;
    //     GlobalScript.sendMsgToCenterSever("InviteReworldReq",{uid:GameData.playerData.uid,getRewarldIndex:Number(this._reworldDataArr[_index].index)});
    // }
    // _destroy(){
    //     this.node.destroy();
    //     EventManager.offAll(this);
    // }
}
