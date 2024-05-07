// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { PanelBase } from "../../../common/base/PanelBase";
import { AbsAdapter } from "../../../common/components/ListView";
import { I_rankInfo } from "../../../common/interface/I_Center";
import { Dic } from "../../../common/interface/I_Common";
import { e_RoomType } from "../../../common/interface/I_Game";
import RankItem from "./RankItem";

const {ccclass, property} = cc._decorator;
const msgTypeMap={
    [e_RoomType.GAME_SINGROOM]:"normalGame",
    [e_RoomType.GAME_FIGHT]:"fightGame"
}
enum e_rankType{
    FRIEND,
    TOTAL
}
const gameTypePanelIndex = [e_RoomType.GAME_SINGROOM,e_RoomType.GAME_FIGHT]
const rankTypePanelIndex = [e_rankType.FRIEND,e_rankType.TOTAL]
@ccclass
export default class RankingPanel extends PanelBase {
    dataArr:Dic<I_rankInfo> = {}
    @property(cc.Node)
    display:cc.Node
    gameType:e_RoomType = e_RoomType.GAME_FIGHT
    rankType:e_rankType = e_rankType.TOTAL
    
    onLoad () {
    }
    start () {
        super.start();
        this.initRankPanel();
    }

    btn_changeGameType(event){
        var node=event.currentTarget;
        var index=node.parent.children.indexOf(node);
        this.gameType = gameTypePanelIndex[index];
        this.initRankPanel()
    }
    btn_changeRankType(event){
        var node=event.currentTarget;
        let index =node.parent.children.indexOf(node);
        var rankType = rankTypePanelIndex[index];
        this.rankType = rankType;
        this.initRankPanel();
    }
    updateRankTypeBtnShow(){
        var leftBtnPanel=cc.find("leftBtnPanel",this.node);
        let curIndex = gameTypePanelIndex.indexOf(this.gameType);
        for(var i in leftBtnPanel.children){
            if(curIndex==Number(i)){
                cc.find("btn",leftBtnPanel.children[i]).active=true; 
            }else{
                cc.find("btn",leftBtnPanel.children[i]).active=false; 
            }
        }

    }
    updateGameTypeBtnShow(){
        var upBtnPanel=cc.find("upBtnPanel",this.node);
        let curIndex = rankTypePanelIndex.indexOf(this.rankType);
        for(var i in upBtnPanel.children){
            if(curIndex==Number(i)){
              cc.find("touchMask",upBtnPanel.children[i]).active=true;
            }else{
              cc.find("touchMask",upBtnPanel.children[i]).active=false;
            }
        }
    }
    initRankPanel(){
        this.updateGameTypeBtnShow();
        this.updateRankTypeBtnShow();
        if(this.rankType==e_rankType.TOTAL){
            cc.find("worldRankPanel",this.node).active=false;
            cc.find("display",this.node).active=true;
            this.getGameRankData().then((data)=>{
                this.updateRankShow(data);
            })
        }else{
            cc.find("worldRankPanel",this.node).active=true;
            cc.find("display",this.node).active=false;
        }
        game.platFormMgr.postMsg("changeRankType",this.rankType);
    }
    getGameRankData(){
        return new Promise<I_rankInfo>((resolve, reject) => {
            if(this.dataArr[this.gameType]){
                resolve(this.dataArr[this.gameType]);
            }else{
                let gameType = this.gameType;
                game.netMgr.sendSocket({msgHead:"getRankData",msgData:{
                    type:msgTypeMap[gameType]
                }},(data:I_rankInfo)=>{
                    this.dataArr[gameType] = data;
                    if(this.gameType == gameType){
                        resolve(this.dataArr[gameType]);
                    }
                })
            }
        })
    }
    updateRankShow(data:I_rankInfo){
        const adapter = new RankListAdapter()
        adapter["gameType"] = this.gameType;
        adapter.setDataSet(data.playerData);
    }
    closePanel(){
        game.platFormMgr.postMsg("changeRankType",0);
        super.closePanel();
    }
}
class RankListAdapter extends AbsAdapter {
    updateView(item, posIndex) {
        let comp:RankItem = item.getComponent("RankItem");
        if (comp) {
            comp.setData(this.getItem(posIndex),Number(posIndex)+1,this["gameType"]);
        }
    }
}
