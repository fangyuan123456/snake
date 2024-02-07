// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
import { SocketType } from "../common/Game";
import { SCENE_NAME, SceneBase } from "../common/base/SceneBase";

//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html
const {ccclass, property} = cc._decorator;

@ccclass
export default class GameScene extends SceneBase {
    constructor(){
        super(SCENE_NAME.GAMESCENE);
    }
    start () {
        super.start();
        this.init();   
    }
    init(){
        game.gameData.getRoomInfo((data)=>{
            if(data.roomId<=0){
                game.alertMgr.showTiShiBox({content:"对局已结束！",btnCallBackList:[
                    {
                        callBack:()=>{
                            game.sceneMgr.changeScene(SCENE_NAME.MENUSCENE);
                        }
                    }
                ]})
                game.netMgr.closeAndDestroySocket(SocketType.game);
            }else{
                if(!game.netMgr.socketMap[SocketType.game]){
                    this.createGameSocket(data.roomIp);
                    game.netMgr.onReady(()=>{
                        game.netMgr.sendSocket({msgHead:"enterRoom",msgData:{}},(data:any)=>{
                            game.logMgr.debug(data);
                        },SocketType.game)
                    },this,SocketType.game)
                }
            }
        },this);
    }
    createGameSocket(ip){
        game.netMgr.createSocket(ip,SocketType.game,true);
    }
    protected onDestroy(): void {
        super.onDestroy();
        game.netMgr.closeAndDestroySocket(SocketType.game);
    }
}
