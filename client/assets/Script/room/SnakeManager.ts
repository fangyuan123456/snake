// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { CompBase } from "../common/base/CompBase";
import { gameDefine } from "../common/configs/RoomCfg";
import SnakeBase from "./base/SnakeBase";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SnakeManager extends CompBase {
    @property(cc.Prefab)
    snakePrefab:cc.Prefab
    start () {
        game.eventMgr.once("gameInit",this.gameInit.bind(this),this);
    }
    gameInit(){
        this.createSnake();
    }
    private createSnake(){
        let roomInfo = game.roomData.roomInfo;
        for(let i in roomInfo.playerInfos){
            let playerInfo = roomInfo.playerInfos[i];
            let node = cc.instantiate(this.snakePrefab);
            this.node.addChild(node);

            node.getComponent(SnakeBase).init({initPos:new cc.Vec3(0,0,0),dir:gameDefine.defaultDir,playerInfo:{uid:Number(i),nickName:playerInfo.nickName,avatarUrl:playerInfo.avatarUrl,rankScore:playerInfo.rankScore}})
            if(Number(i) == game.userData.uid){
                game.roomData.mySnake = node.getComponent(SnakeBase);
            }
        }
    }
}
