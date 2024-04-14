// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { CompBase } from "../../../common/base/CompBase";
import { I_rankItemInfo } from "../../../common/interface/I_Center";
import { e_RoomType } from "../../../common/interface/I_Game";

const {ccclass, property} = cc._decorator;

@ccclass
export default class RankItem extends CompBase {
    rankNum:number
    isMyItem:boolean
    gameType:e_RoomType
    setData(data: I_rankItemInfo,rankNum:number,gameType:e_RoomType,isMyItem?:boolean) {
        this.rankNum = rankNum;
        this.gameType = gameType;
        this.isMyItem = isMyItem;
        this.setUserInfo(data);
    }

    setUserInfo(data:I_rankItemInfo){
        cc.find("rankingNum",this.node).getComponent(cc.Label).string=this.rankNum+"";
        cc.find("rankingNum",this.node).active=false;
        cc.find("rankingSp",this.node).active=false;
        switch(this.rankNum){
            case 1:
            cc.find("rankingNum",this.node).active=false;
            cc.find("rankingSp",this.node).active=true;
            game.resMgr.setSpImg(cc.find("rankingSp",this.node),"loadRes/ranking/rankNumSp1");
            case 2:
             cc.find("rankingNum",this.node).active=false;
             cc.find("rankingSp",this.node).active=true;
            game.resMgr.setSpImg(cc.find("rankingSp",this.node),"loadRes/ranking/rankNumSp1");
            break;
            case 3:
             cc.find("rankingNum",this.node).active=false;
            cc.find("rankingSp",this.node).active=true;
            game.resMgr.setSpImg(cc.find("rankingSp",this.node),"loadRes/ranking/rankNumSp1");
            break;
            default:
            cc.find("rankingNum",this.node).active=true;
            cc.find("rankingSp",this.node).active=false;
            break;
        }
        cc.find("name",this.node).getComponent(cc.Label).string=this.getNickName(data.nickName);
        if(data.avatarUrl){
            game.resMgr.setSpImg(cc.find("headBg/Mask/Icon",this.node),data.avatarUrl,null,true);
        }else{
            game.resMgr.setSpImg(cc.find("headBg/Mask/Icon",this.node),"loadRes/defaultPic");
        }
        if(this.gameType==e_RoomType.GAME_SINGROOM){
            cc.find("scorePanel/scoreLabel",this.node).getComponent(cc.Label).string="最高分:";
            cc.find("scorePanel/tiaoZhanNum",this.node).getComponent(cc.Label).string=data.score+"";
        }else if(this.gameType==e_RoomType.GAME_FIGHT){
            cc.find("scorePanel/scoreLabel",this.node).getComponent(cc.Label).string="段位:";
            cc.find("scorePanel/tiaoZhanNum",this.node).getComponent(cc.Label).string=game.configMgr.getDuanWei(data.score);
        }
    }
    getNickName(nickname){
        if (nickname.length >= 10){
            return nickname.slice(0,8)+"...";
        }else{
            return nickname;
        }
    }
}
