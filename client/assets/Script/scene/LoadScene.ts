// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { Game } from "../common/Game";
import { LOAD_ORDER_CFG } from "../platform/PlatformBase";
import { SceneBase } from "../common/base/SceneBase";
import LoadingComp from "../common/components/LoadingComp";
import { InfoType } from "../common/data/UserData";
import { I_loginReq, I_loginRes } from "../common/interface/I_Login";

const {ccclass, property} = cc._decorator;

@ccclass
export default class LoadScene extends SceneBase {
    @property(LoadingComp)
    progressComp:LoadingComp
    constructor(){
        super();
        Game.getInstance().init();
    }
    start () {
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
                    game.netMgr.onReady((data)=>{
                        game.userData.registerAllInfoMsg();
                        game.netMgr.sendSocket({
                            msgHead:"getRoomInfo",
                            msgData:{}
                        },(data)=>{
                            game.userData.setInfo(InfoType.roomInfo,data);
                            next();
                        })
                    },this);
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
        if(game.userData.roomInfo.roomId){
            game.sceneMgr.changeScene("GameScene",true);
        }else{
            game.sceneMgr.changeScene("MenuScene",true);
        }
        next();
    }
    // update (dt) {}
}
