// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { PanelBase } from "../../../common/base/PanelBase";
import { I_assetInfo, I_roleInfo } from "../../../common/interface/I_Info";
import { I_MatchRoleInfo, I_matchRes } from "../../../common/interface/I_Match";


const {ccclass, property} = cc._decorator;
@ccclass
export default class InvitePanel extends PanelBase {
    roleData:I_roleInfo
    assetData:I_assetInfo
    isInvite:boolean = true
    timer:number = 0;
    countTimeDir:number = 1;
    start () {
        super.start();
        game.userData.getRoleInfo((data:I_roleInfo)=>{
            this.roleData = data;
            this.initGame();
        },this)
        game.userData.getAssetInfo((data:I_assetInfo)=>{
            this.assetData = data;
            this.initGame();
        },this)
        cc.find("panel/titlePanel/label",this.node).getComponent(cc.Label).string = "邀请好友对照！"
        cc.find("panel/titlePanel/dian",this.node).active = false;
        cc.find("panel/titlePanel/time",this.node).active = false;
        this.isInvite = true;
        game.netMgr.sendSocket({msgHead:"inviteFriend",msgData:{isInvite:true}},(data:I_matchRes)=>{
            this.onInviteStateShow(data);
        },this)
        game.netMgr.onClose(()=>{
            this.closePanel();
        },this)
    }
    initGame(){
        if(this.roleData && this.assetData){
            let playerPanelChildren = cc.find("panel/playerPanel",this.node).children;
            for(let i in playerPanelChildren){
                if(Number(i) == 0){
                    this.setPlayerInfo({
                        uid:this.roleData.uid,
                        nickName:this.roleData.nickName,
                        avatarUrl:this.roleData.avatarUrl,
                        rankScore:this.assetData.rankScore
                    },playerPanelChildren[i])
                }else{
                    this.setPlayerInfo(null,playerPanelChildren[i],true);
                }
            }
        }
    }
    onInviteStateShow(data:I_matchRes){
        this.isInvite = false;
        let getInviteRoleInfo = (index:number)=>{
            let roleArr = [];
            for(let i in data.roles){
                if(data.roles[i].uid != game.userData.uid){
                    roleArr.push(data.roles[i]);
                }
            }
            return roleArr[index];
        }
        let playerPanelChildren = cc.find("panel/playerPanel",this.node).children
        for(let i= 1;i<playerPanelChildren.length;i++){
            let role = getInviteRoleInfo(i-1);
            this.setPlayerInfo(role,playerPanelChildren[i])
        }
        this.startGame();
    }
    startGame(){
        cc.find("panel/titlePanel/label",this.node).getComponent(cc.Label).string = "即将开始"
        cc.find("panel/titlePanel/dian",this.node).active = true;
        cc.find("panel/titlePanel/time",this.node).active = true;
        this.timer = 3;
        this.countTimeDir = -1;
        game.netMgr.delaySocketMsg("getRoomInfo",3);
    }
    setPlayerInfo(data:I_MatchRoleInfo,node:cc.Node,isInvite:boolean = false){
        let nickName = cc.find("nickName",node);
        let matchPanel = cc.find("matchPanel",node);
        let rankLevelSp = cc.find("rankLevelSp",node);
        nickName.active = true;
        rankLevelSp.active = true;
        if(matchPanel)matchPanel.active = false;
        if(!isInvite){
            game.resMgr.createRankLevelIcon(rankLevelSp,data.rankScore);
            game.resMgr.setPlayerIcon(cc.find("mask/icon",node),data.avatarUrl);
            nickName.getComponent(cc.Label).string = data.nickName;
        }else{
            nickName.active = false;
            rankLevelSp.active = false;
            if(matchPanel)matchPanel.active = true;
            cc.find("namePanel/label",matchPanel).getComponent(cc.Label).string = "邀请好友";
            cc.find("btnInvite",matchPanel).on(cc.Node.EventType.TOUCH_CANCEL,this.btn_invite.bind(this),this);

        }
    }
    btn_invite(){

    }
    protected update(dt: number): void {
        this.timer +=(dt*this.countTimeDir);
        cc.find("panel/titlePanel/time",this.node).getComponent(cc.Label).string = Math.ceil(this.timer)+"";
    }
    protected onDestroy(): void {
        super.onDestroy();
        if(this.isInvite){
            game.netMgr.sendSocket({msgHead:"inviteFriend",msgData:{isInvite:false}});
        }
    }
}
