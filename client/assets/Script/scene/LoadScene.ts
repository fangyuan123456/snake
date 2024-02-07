// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { Game } from "../common/Game";
import { LOAD_ORDER_CFG } from "../platform/PlatformBase";
import { SCENE_NAME, SceneBase } from "../common/base/SceneBase";
import LoadingComp from "../common/components/LoadingComp";
import { I_loginReq, I_loginRes } from "../common/interface/I_Login";

const {ccclass, property} = cc._decorator;

@ccclass
export default class LoadScene extends SceneBase {
    @property(LoadingComp)
    progressComp:LoadingComp
    constructor(){
        super(SCENE_NAME.LOADSCENE);
    }
    start () {
        Game.getInstance().init();
        super.start();
        let loadingCfg = game.platFormMgr.getLoadPercentCfg();
        this.progressComp.startRun(loadingCfg,this);
    }
    loadRes(next){
        this.scheduleOnce(function(){
            next();
        },1)
    }
    login(next){
        game.platFormMgr.getLoginCode((data)=>{
            if(data.code){
                game.netMgr.sendHttpRequest(data,"login",(loginData:I_loginRes)=>{
                    game.userData.setLoginData(loginData);
                    game.netMgr.createSocket(game.userData.centerIp)
                    game.netMgr.onReady(()=>{
                        next();
                    },this)
                })
            }else{
                game.alertMgr.showTiShiBox({content:"code错误!",btnCallBackList:[
                    {
                    }
                ]})
            }
        });
    }
    changeScene(next){
        game.gameData.getRoomInfo((data)=>{
            if(data.roomId&&data.roomId>0){
                game.sceneMgr.changeScene(SCENE_NAME.GAMESCENE,true);
            }else{
                game.sceneMgr.changeScene(SCENE_NAME.MENUSCENE,true);
            }
            next();
        },this)
    }
    // update (dt) {}
}
