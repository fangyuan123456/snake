// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
import { SocketType } from "../common/Game";
import { SCENE_NAME, SceneBase } from "../common/base/SceneBase";
import RoomData from "../common/data/RoomData";
import { I_enterRoomRes } from "../common/interface/I_Game";

//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html
const {ccclass, property} = cc._decorator;

@ccclass
export default class GameScene extends SceneBase {
    constructor(){
        super(SCENE_NAME.GAMESCENE);
    }
    start () {
        super.start(); 
        cc.find("Canvas").addComponent(RoomData)
    }
}
