// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html
import { CompBase } from "../common/base/CompBase";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameControl extends CompBase {
    isClickAddSpeed:boolean
    start () {
        super.start();
        cc.find("controlBarPanel/bar",this.node).on(cc.Node.EventType.TOUCH_MOVE,this.touchMoveFunc.bind(this));
        cc.find("controlBarPanel/bar",this.node).on(cc.Node.EventType.TOUCH_END,this.touchEndFunc.bind(this));
        cc.find("controlBarPanel/bar",this.node).on(cc.Node.EventType.TOUCH_CANCEL,this.touchEndFunc.bind(this));

        cc.find("btn_addSpeed",this.node).on(cc.Node.EventType.TOUCH_START,this.touchAddSpeed.bind(this,true));
        cc.find("btn_addSpeed",this.node).on(cc.Node.EventType.TOUCH_END,this.touchEndAddSpeed.bind(this));
        cc.find("btn_addSpeed",this.node).on(cc.Node.EventType.TOUCH_CANCEL,this.touchEndAddSpeed.bind(this));
    }
    touchMoveFunc(event:cc.Event.EventTouch){
        let width = cc.find("controlBarPanel/barBg",this.node).width;
        let pos = cc.find("controlBarPanel",this.node).convertToNodeSpaceAR(event.getLocation());
        let distance = pos.len();
        if(distance>width/2){
            distance = width/2;
        }
        pos = pos.normalize().mul(distance);
        cc.find("controlBarPanel/bar",this.node).position = cc.v3(pos.x,pos.y,0);
        this.collectPlayType();
    }
    touchEndFunc(event:cc.Event.EventTouch){
        cc.find("controlBarPanel/bar",this.node).runAction(cc.sequence(
            cc.moveTo(0.1,cc.v2(0,0)),
            cc.callFunc(function(){})
        ))
    }
    touchAddSpeed(event:cc.Event.EventTouch){
        this.isClickAddSpeed = true
        this.collectPlayType();
    }
    touchEndAddSpeed(event:cc.Event.EventTouch){
        this.isClickAddSpeed = false
        this.collectPlayType();
    }
    collectPlayType(){
        let vec3 = cc.find("controlBarPanel/bar",this.node).position;
        if(!vec3.equals(cc.v3(0,0,0)) || this.isClickAddSpeed){
            let angle = 0;
            if(!vec3.equals(cc.v3(0,0,0))){
                let vec = cc.v2(vec3.x,vec3.y).normalize();
                let rAngle = -vec.signAngle(cc.v2(1,0));
                angle = cc.misc.radiansToDegrees(rAngle);
                if(angle<0){
                    angle +=360;
                }
            }
            let playType1 = this.isClickAddSpeed?1:0;
            let playType = playType1 + Math.floor(angle)*10;
            game.roomData.setCollectPlayType(playType);
        }else{
            game.roomData.setCollectPlayType();
        }
    }
}
