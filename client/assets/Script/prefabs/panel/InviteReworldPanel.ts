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
    getRewardIndexs: number[];
    inviteUids: number[];
    rewardCfg: any;
    start () {
        super.start();
        game.userData.getInviteRewardInfo((data)=>{
            this.getRewardIndexs = data.getRewardIndexs;
            this.inviteUids = data.inviteUids;
            this.initPanel();
        },this)
        game.configMgr.getCfg("inviteReward",(data)=>{
            this.rewardCfg = data;
            this.initReWorldPanel();
        },this)
    }
    initPanel(){
        this.initPlayerPanel();
        this.initReWorldPanel();
    }
    initPlayerPanel(){
        let playerNodeArr=cc.find("panel/bg/playerPanel/view/content",this.node).children;
        for(let i=0;i<playerNodeArr.length;i++){
            if(i<6){
                let icon=cc.find("iconBg/mask/icon",playerNodeArr[i]);
                icon.getComponent(cc.Sprite).spriteFrame=null;
                if(!this.inviteUids[i]){
                    playerNodeArr[i].on(cc.Node.EventType.TOUCH_END,this.btn_share.bind(this));
                }
            }else{
                playerNodeArr.splice(i,1);
                i--;
            }
        }
        for(let j in this.inviteUids){
            let _node=playerNodeArr[j];
            if(!_node){
                _node=cc.instantiate(playerNodeArr[0]);
                cc.find("panel/bg/playerPanel/view/content",this.node).addChild(_node);
            }
            let icon=cc.find("iconBg/mask/icon",_node);
            game.resMgr.setSpImg(icon,"http://127.0.0.1:8080/fileDownLoad/default.png",null,true);
        }
        cc.find("panel/bg/inviteNumPanel/inviteNum",this.node).getComponent(cc.Label).string=this.inviteUids.length+"";
    }
    private initReWorldPanel(){
        if(!this.rewardCfg || !this.inviteUids){
            return;
        }
        let rewroldNodeArr=cc.find("panel/bg/reworldPanel/view/content",this.node).children;
        for(let i=0;i<rewroldNodeArr.length;i++){
            let _data=this.rewardCfg[i+1];
            if(!_data){
                rewroldNodeArr.splice(i,1);
                i--;
            }
        }
        for(let i in this.rewardCfg){
            let _item=rewroldNodeArr[Number(i)-1];
            if(!_item){
                _item=cc.instantiate(rewroldNodeArr[0]);
                cc.find("panel/bg/reworldPanel/view/content",this.node).addChild(_item);
            }
            _item.active=true;
            cc.find("btn",_item).on(cc.Node.EventType.TOUCH_END,(event)=>{
                this.btn_getReworld(event,Number(i));
            });
        }

        for(let i in this.rewardCfg){
            let _data=this.rewardCfg[i];
            let _item=rewroldNodeArr[Number(i)-1];
            cc.find("numLabel",_item).getComponent(cc.Label).string=this.inviteUids.length+"/"+_data.inviteNum;
            for(let j in _data.reward){
                game.resMgr.createItem({item:{id:Number(j),num:_data.reward[j]},scale:0.6},cc.find("itemPanel",_item))
            }
            cc.find("btn/state1",_item).active=false;
            cc.find("btn/state2",_item).active=false;
            cc.find("btn/state3",_item).active=false;
            if(this.inviteUids.length<_data.inviteNum){
                cc.find("btn",_item).getComponent(cc.Button).interactable=false;
                cc.find("btn/state2",_item).active=true;
            }else{
                if(_data.isGetReworld=="1"){
                    cc.find("btn/state3",_item).active=true;
                    cc.find("btn",_item).getComponent(cc.Button).interactable=false;
                }else{
                    cc.find("btn/state1",_item).active=true;
                    cc.find("btn",_item).getComponent(cc.Button).interactable=true;
                }
            }
        }
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
