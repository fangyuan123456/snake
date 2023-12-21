// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { Global } from "../common/Global";
import { LOAD_ORDER_CFG } from "../platform/PlatformBase";
import { SceneBase } from "../common/base/SceneBase";
import LoadingComponent from "../common/components/LoadingComponent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class LoadScene extends SceneBase {
    @property(LoadingComponent)
    progressComp:LoadingComponent
    constructor(){
        super();
        Global.getInstance().init();
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
            game.netMgr.sendHttpRequest(data,"login",()=>{
                next();
            })
        });
    }
    changeScene(next){
        cc.director.loadScene("MenuScene");
        next();
    }
    // update (dt) {}
}
