// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { PanelBase } from "../../common/base/PanelBase";
import { I_inviteReward } from "../../common/interface/I_Info";

const {ccclass, property} = cc._decorator;

@ccclass
export default class InviteReworldPanel extends PanelBase {
    start () {
        super.start();
        game.userData.getInviteRewardInfo((data)=>{
            this.initPanel(data);
        },this)
    }
    initPanel(data:I_inviteReward){
        this.initPlayerPanel(data.getRewardIndexs);
        this.initReWorldPanel(data.inviteUids);
    }
    initPlayerPanel(uids:number[]){
        let playerNodeArr=cc.find("panel/bg/playerPanel/view/content",this.node).children;
        for(let i=0;i<playerNodeArr.length;i++){
            if(i<6){
                let icon=cc.find("iconBg/mask/icon",playerNodeArr[i]);
                icon.getComponent(cc.Sprite).spriteFrame=null;
                if(!uids[i]){
                    playerNodeArr[i].on(cc.Node.EventType.TOUCH_END,this.btn_share.bind(this));
                }
            }else{
                playerNodeArr.splice(i,1);
                i--;
            }
        }
        for(let j in uids){
            let _node=playerNodeArr[j];
            if(!_node){
                _node=cc.instantiate(playerNodeArr[0]);
                cc.find("panel/bg/playerPanel/view/content",this.node).addChild(_node);
            }
            let icon=cc.find("iconBg/mask/icon",_node);
            // GlobalScript.loadHttpIcon(icon,playerArr[i].avatarUrl);
        }
    }
    private initReWorldPanel(getRewardIndexs:number[]){
        // let inviteNum=this.configData.player.length;
        // cc.find("panel/bg/inviteNumPanel/inviteNum",this.node).getComponent(cc.Label).string=inviteNum;
        // let rewroldNodeArr=cc.find("panel/bg/reworldPanel/view/content",this.node).children;
        // for(let i=0;i<rewroldNodeArr.length;i++){
        //     let _data=this._reworldDataArr[i];
        //     if(!_data){
        //         rewroldNodeArr.splice(i,1);
        //         i--;
        //     }
        // }
        // for(let i in this._reworldDataArr){
        //     let _item=rewroldNodeArr[i];
        //     if(!_item){
        //         _item=cc.instantiate(rewroldNodeArr[0]);
        //         cc.find("panel/bg/reworldPanel/view/content",this.node).addChild(_item);
        //     }
        //     _item._tag=i;
        //     _item.active=true;
        //     cc.find("btn",_item).on(cc.Node.EventType.TOUCH_END,(event)=>{
        //         this.btn_getReworld(event,Number(i));
        //     });
        // }

        // for(let i in this._reworldDataArr){
        //     let _data=this._reworldDataArr[i];
        //     let _item=rewroldNodeArr[i];
        //     cc.find("numLabel",_item).getComponent(cc.Label).string=inviteNum+"/"+_data.inviteNum;
        //     let _str="";
        //     cc.find("rewroldBg",_item).active=false;
        //     cc.find("propPanel",_item).active=false;
        //     let itemIndex=0;
        //     for(let j in this._reworldDataArr[i].prop){
        //         _str=this._reworldDataArr[i].prop[j].num;
        //         if(j>2){
        //             cc.find("propPanel",_item).active=true;
        //             let propNodeArr=cc.find("propPanel",_item).children;
        //             let item=propNodeArr[itemIndex];
        //             if(!item){
        //                 item=cc.instantiate(propNodeArr[0])
        //                 cc.find("propPanel",_item).addChild(item)
        //             }
        //             GlobalScript.loadSp(cc.find("sp",item),"loadRes/propPic/prop"+j);
        //             cc.find("num",item).getComponent(cc.Label).string=_str;
        //             itemIndex++;
        //         }else{
        //             cc.find("rewroldBg",_item).active=true;
        //             GlobalScript.loadSp(cc.find("rewroldBg/rewroldIcon",_item),"loadRes/propPic/prop"+j);
        //             cc.find("rewroldBg/reworldNum",_item).getComponent(cc.Label).string=_str;
        //         }
        //     }
        //     for(let j in this._reworldDataArr[i].havePiFu){
        //         GlobalScript.loadSp(cc.find("rewroldBg/rewroldIcon",_item),"loadRes/piFuPic/piFu"+j);
        //         cc.find("rewroldBg/reworldNum",_item).getComponent(cc.Label).string=_str;
        //     }
        //     cc.find("btn/state1",_item).active=false;
        //     cc.find("btn/state2",_item).active=false;
        //     cc.find("btn/state3",_item).active=false;
        //     if(inviteNum<_data.inviteNum){
        //         cc.find("btn",_item).getComponent(cc.Button).interactable=false;
        //         cc.find("btn/state2",_item).active=true;
        //     }else{
        //         if(_data.isGetReworld=="1"){
        //             cc.find("btn/state3",_item).active=true;
        //             cc.find("btn",_item).getComponent(cc.Button).interactable=false;
        //         }else{
        //             cc.find("btn/state1",_item).active=true;
        //             cc.find("btn",_item).getComponent(cc.Button).interactable=true;
        //         }
        //     }
        // }
    }

    btn_share(){
        game.platFormMgr.share("真的不一样的方块决斗,赶紧来体验吧!");
    }
    btn_getReworld(event,index){
        game.netMgr.sendSocket({msgHead:"getInviteReward",msgData:{getRewardIndex:index}},(data)=>{
            if(data.isOk){

            }
        })
    }
}
