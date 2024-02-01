// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { PanelBase } from "../../common/base/PanelBase";
import { ROOM_TYPE } from "../../common/interface/I_Game";

const {ccclass, property} = cc._decorator;
@ccclass
export default class MatchPanel extends PanelBase {
    roomType: ROOM_TYPE;
    start () {
        super.start();
    }
    init(data: { parmeter?: any; closeCallBack?: (any: any) => void; }): void {
        super.init(data);
        this.roomType=data.parmeter;

        cc.find("panel/matchPanel",this.node).active=false;
        cc.find("panel/invitePanel",this.node).active=false;
        cc.find("panel/matchOkPanel",this.node).active=false;
        var playerPanelChildren=cc.find("panel/playerPanel",this.node).children;
        cc.find("nickName",playerPanelChildren[1]).active=false;
        cc.find("matchNamePanel",playerPanelChildren[1]).active=false;

        cc.find("rankLevelSp",playerPanelChildren[0]).active=true;
        cc.find("rankLevelSp",playerPanelChildren[1]).active=false;

        game.resMgr.createRankLevelIcon(cc.find("rankLevelSp",playerPanelChildren[0]));

        game.resMgr.setSpImg(cc.find("panel/changCiBg/changCi",this.node),"pic/prefabs/matchPic/selectTitle"+this.roomType)
    
        if(this.roomType==ROOM_TYPE.FRIEND){
            cc.find("panel/invitePanel",this.node).active=true;
            cc.find("matchNamePanel",playerPanelChildren[1]).active=true;
            cc.find("matchNamePanel/label",playerPanelChildren[1]).getComponent(cc.Label).string="等待好友加入中...";
            game.gameData.friendMatchUid=game.userData.uid;
            // GlobalScript.sendMsgToCenterSever("inviteFriendReq",{
            //     uid:GameData.playerData.uid,
            //     inviteKey:WxApiManager.inviteKey,
            // });
        }else{
            cc.find("panel/matchPanel",this.node).active=true;
            cc.find("matchNamePanel",playerPanelChildren[1]).active=true;
            cc.find("matchNamePanel/label",playerPanelChildren[1]).getComponent(cc.Label).string="正在匹配中...";
            GlobalScript.sendMsgToCenterSever("matchPlayerReq",{uid:GameData.playerData.uid,selectType:this.selectType,isMatch:true});
            this.runMathingAction();
        }
        var playerPanelChildren=cc.find("panel/playerPanel",this.node).children;
        cc.find("nickName",playerPanelChildren[0]).getComponent(cc.Label).string=GameData.playerData.nickName;
        GlobalScript.loadHttpIcon(cc.find("mask/icon",playerPanelChildren[0]),GameData.playerData.avatarUrl);
    }
    runMathingAction(){
        var playerPanelChildren=cc.find("panel/playerPanel",this.node).children;
        cc.find("mask/icon",playerPanelChildren[1]).active=false;
        var iconRollingPanel=cc.find("mask/iconRollingPanel",playerPanelChildren[1]);
        iconRollingPanel.active=true;
        iconRollingPanel.children[0].y=-52;
        iconRollingPanel.children[1].y=598;
        this.schedule(this._iconRollingCallFunc,0.02)
    }
    stopMatchAction(_data,callback){
        var that=this;
        var playerPanelChildren=cc.find("panel/playerPanel",this.node).children;
        cc.find("mask/icon",playerPanelChildren[1]).active=true;
        cc.find("mask/icon",playerPanelChildren[1]).y=105;
        GlobalScript.loadHttpIcon(cc.find("mask/icon",playerPanelChildren[1]),_data.avatarUrl);
        this.scheduleOnce(function(){
            cc.find("mask/iconRollingPanel",playerPanelChildren[1]).active=false;
            that.unschedule(this._iconRollingCallFunc);
            cc.find("mask/icon",playerPanelChildren[1]).runAction(
                cc.sequence(
                        cc.moveTo(0.1,cc.v2(0,0)),
                        cc.callFunc(function(){
                            if(callback)callback();
                        })
                    )
            );
        }0.5)
    }
    _iconRollingCallFunc(){
        var playerPanelChildren=cc.find("panel/playerPanel",this.node).children;
        var iconRollingPanel=cc.find("mask/iconRollingPanel",playerPanelChildren[1]);
        for(var i=0;i<iconRollingPanel.children.length;i++){
            iconRollingPanel.children[i].y-=20;
            if(iconRollingPanel.children[i].y<-52){
                iconRollingPanel.children[i].y+=1300
            }
        }
    }
    btn_invite(){
        WxApiManager.shareToWx(GameData.playerData.nickName+"@你，我不信，俄罗斯方块你能玩过我，来solo一局吧！",
            "",
            "inviteKey="+WxApiManager.inviteKey,
        );
    }
    btn_back(){
        this._destroy(true)
    }
    matchPlayerRes(_data){
        var that=this;
        var playerPanelChildren=cc.find("panel/playerPanel",this.node).children;

        cc.find("exit",this.node).active=false;
        var callback=function(){
            cc.find("panel/matchPanel",that.node).active=false;
            cc.find("panel/invitePanel",that.node).active=false;
            cc.find("panel/matchOkPanel",that.node).active=true;
    
            cc.find("matchNamePanel",playerPanelChildren[1]).active=false;
            cc.find("nickName",playerPanelChildren[1]).active=true;
    
            cc.find("rankLevelSp",playerPanelChildren[1]).active=true;
            GlobalScript.setDuanWeiSp(cc.find("rankLevelSp",playerPanelChildren[1]),GlobalScript.getCommonScript().getDuanWeiLevel(_data.fightScore));
    
            cc.find("nickName",playerPanelChildren[1]).getComponent(cc.Label).string=_data.nickName;
            cc.find("kuang",playerPanelChildren[1]).active=true;
            cc.find("kuang",playerPanelChildren[1]).runAction(cc.repeatForever(cc.sequence(cc.fadeTo(0.1,150),cc.fadeTo(0.1,255))))
        }
        var delayTime=2;
        if(this.selectType==GameConfig.ROOM_CHANGCI_TYPE.FRIEND){
            delayTime=5;
            callback()
            WxApiManager.inviteKey=null;
        }else{
            this.stopMatchAction(_data,callback);
        }
        var _callfunc=function(_data){
            if(_data.isRobot){
                GameData.roomType=GameConfig.ROOM_TYPE.GAME_ROBOTE;
                that._destroy();
                GlobalScript.runScene("GameScenePrefab");
                GameData.robotRoomFightData=_data;
            }
        }.bind(this,_data)
        GlobalScript.delayMessage(["getRoomIdRes"]);
        this.scheduleOnce(function(){
            _callfunc();
            GlobalScript.runDelayMessage(["getRoomIdRes"]);
        }delayTime)
    }
    update(dt){
        this.timer+=dt;
        cc.find("panel/matchPanel/time",this.node).getComponent(cc.Label).string=parseInt(this.timer)+1+"";
    }
    _destroy(_isCloseMatch){
        if(_isCloseMatch){
            if(this.selectType==GameConfig.ROOM_CHANGCI_TYPE.FRIEND){
                GlobalScript.sendMsgToCenterSever("inviteFriendReq",{
                    uid:GameData.playerData.uid,
                    inviteKey:null,
                });
            }else{
                GlobalScript.sendMsgToCenterSever("matchPlayerReq",{uid:GameData.playerData.uid,isMatch:false});
            }
        }
        this.node.destroy();
        EventManager.offAll(this);
        // AduintManager._showBannerAd(false,cc.find("btnpanel",this.node));
    }
}
