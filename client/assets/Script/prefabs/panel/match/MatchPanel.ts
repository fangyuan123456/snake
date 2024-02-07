// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { PanelBase } from "../../../common/base/PanelBase";
import { I_assetInfo, I_roleInfo } from "../../../common/interface/I_Info";
import { I_MatchRoleInfo, I_matchRes } from "../../../common/interface/I_Match";
import IconRollingNode from "./IconRollingNode";


const {ccclass, property} = cc._decorator;
@ccclass
export default class MatchPanel extends PanelBase {
    roleData:I_roleInfo
    assetData:I_assetInfo
    isMatching:boolean = true
    @property(cc.Prefab)
    matchRollingPrefab:cc.Prefab = null;
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
        this.isMatching = true;
        game.netMgr.sendSocket({msgHead:"match",msgData:{isMatch:true}},(data:I_matchRes)=>{
            this.onMatchOk(data);
        },this)
        game.netMgr.onClose(()=>{
            this.closePanel();
        },this)
    }
    initGame(){
        if(this.roleData && this.assetData){
            let rankLevel = game.utilsMgr.getRankLevel(this.assetData.rankScore).level;
            game.resMgr.setSpImg(cc.find("panel/changCiBg/changCi",this.node),"pic/prefabs/matchPic/selectTitle"+rankLevel);
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
    onMatchOk(data:I_matchRes){
        this.isMatching = false;
        let getMatchRoleInfo = (index:number)=>{
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
            let role = getMatchRoleInfo(i-1);
            let matchRollingNode = cc.find("mask/IconRollingNode",playerPanelChildren[i]);
            matchRollingNode.getComponent(IconRollingNode).stopRolling(data.roles[i].avatarUrl,()=>{
                this.setPlayerInfo(role,playerPanelChildren[i])
            })
        }
        this.startGame();
    }
    startGame(){
        cc.find("panel/titlePanel/label",this.node).getComponent(cc.Label).string = "即将开始"
        this.timer = 3;
        this.countTimeDir = -1;
        game.netMgr.delaySocketMsg("getRoomInfo",3);
    }
    setPlayerInfo(data:I_MatchRoleInfo,node:cc.Node,isMatching:boolean = false){
        let nickName = cc.find("nickName",node);
        let matchPanel = cc.find("matchPanel",node);
        let rankLevelSp = cc.find("rankLevelSp",node);
        nickName.active = true;
        rankLevelSp.active = true;
        if(matchPanel)matchPanel.active = false;
        if(!isMatching){
            game.resMgr.createRankLevelIcon(rankLevelSp,data.rankScore);
            game.resMgr.setPlayerIcon(cc.find("mask/icon",node),data.avatarUrl);
            nickName.getComponent(cc.Label).string = data.nickName;
            let matchRollingNode = cc.find("mask/IconRollingNode",node);
            if(matchRollingNode){
                matchRollingNode.destroy();
            }
        }else{
            nickName.active = false;
            rankLevelSp.active = false;
            if(matchPanel)matchPanel.active = true;
            let rollingNode = cc.instantiate(this.matchRollingPrefab);
            cc.find("mask",node).addChild(rollingNode);
        }
    }
    protected update(dt: number): void {
        this.timer +=(dt*this.countTimeDir);
        cc.find("panel/titlePanel/time",this.node).getComponent(cc.Label).string = Math.ceil(this.timer)+"";
    }
    protected onDestroy(): void {
        super.onDestroy();
        if(this.isMatching){
            game.netMgr.sendSocket({msgHead:"match",msgData:{isMatch:false}});
        }
    }
}
