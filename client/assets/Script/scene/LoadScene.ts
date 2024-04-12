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
import { DataBindManager, ObservableProxy } from "../common/manager/DataBindManager";

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
        let loadingCfg = game.platFormMgr.getLoadPercentCfg();
        this.loadTask = new LoadingTask();
        this.loadTask.startLoad(loadingCfg,this,this.updateLoadBar.bind(this));

        // this.test();
    }

    test(){
        // game.storgeMgr.clearAllStroge();
            // 示例对象
            let A = {
                name: {
                    aa: 'Alice'
                },
                age: 30
            };

            let B = {
                name: {
                    aa: 'Alice'
                },
                age: 30
            };
            let C = {
                name: {
                    aa: 'Alice'
                },
                age: 30
            };
            game.dataBindMgr.bind({curData:{target:B,key:"name"},targetData:{target:A,key:"name"}},()=>{
                console.log(JSON.stringify(B))
            })
            game.dataBindMgr.bind({curData:{target:C,key:"name"},targetData:{target:A,key:"name"}},()=>{
                console.log(JSON.stringify(C))
            })
            A.name = {
                aa: '77777'
            };
            A.name.aa = "fangyuan";
            // 

            // 创建代理对象
            // let proxyA = new ObservableProxy({target:A,key:"name"});
            // A.name.aa = "13";

            // // 使用代理对象
            // console.log(proxyA.name.aa); // 输出: "Getting property "name""，然后输出: "Getting property "aa""，然后输出: "Alice"
            // proxyA.name.aa = 'Bob'; // 输出: "Setting property "aa" to "Bob""
            // console.log(proxyA.name.aa); // 输出: "Getting property "name""，然后输出: "Getting property "aa""，然后输出: "Bob"


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
