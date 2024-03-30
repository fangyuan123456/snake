// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { Game } from "../common/Game";
import { SCENE_NAME, SceneBase } from "../common/base/SceneBase";
import { I_loginReq, I_loginRes } from "../common/interface/I_Login";
import { Dic } from "../common/interface/I_Common";
import { LoadingTask } from "../common/customClass/LoadingTask";

const {ccclass, property} = cc._decorator;

@ccclass
export default class LoadScene extends SceneBase {
    loadTask:LoadingTask;
    constructor(){
        super(SCENE_NAME.LOADSCENE);
    }
    start () {
        Game.getInstance().init();
        super.start();

        let obj1 = {A:1};
        let obj2 = {B:2};
        game.dataBindMgr.bind({
            curData:{
                target:obj2,
                key:"B"
            },
            targetData:{
                target:obj1,
                key:"A"
            }
        },(value)=>{
            console.log(value);
            console.log(obj2)
        })
        obj1.A = 3;
        let loadingCfg = game.platFormMgr.getLoadPercentCfg();
        this.loadTask = new LoadingTask();
        this.loadTask.startLoad(loadingCfg,this,this.updateLoadBar.bind(this));
    }
    updateLoadBar(progress:number,title:string){
        let loadingBar = cc.find("Canvas/progressBarLoading").getComponent(cc.ProgressBar)
        let progressText = cc.find("Canvas/progressNum").getComponent(cc.Label)
        loadingBar.progress = progress;
        progressText.string = Math.ceil(progress*100)+"%"
    }
    loadRes(next){
        this.scheduleOnce(function(){
            next();
        },1)
    }
    async loadCfg(next){
        await game.storgeMgr.checkVersionInvildAndClean();
        let cfgVersion = await game.resMgr.loadCfg("version");
        game.netMgr.sendHttpRequest(cfgVersion,"getTableCfg",(cfgData:Dic<any>)=>{
            if(Object.keys(cfgData).length>0){
                game.storgeMgr.setCfgStroge(cfgData);
            }
            next();
        })
    }
    login(next){
        game.platFormMgr.getLoginCode((data)=>{
            if(data.code){
                game.netMgr.sendHttpRequest(data,"login",(loginData:I_loginRes)=>{
                    game.userData.setLoginData(loginData);
                    game.netMgr.createSocket(game.gameData.centerIp)
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
