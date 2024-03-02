// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { CompBase } from "../../common/base/CompBase";
import { gameDefine } from "../../common/configs/RoomCfg";
import { Decimal } from "../../common/math/Decimal";
import { DecimalVec } from "../../common/math/DecimalVec";
import { FMath } from "../../common/math/FMath";

const {ccclass, property} = cc._decorator;

export interface I_snakeInfo{
    uid:number,
    nickName:string,
    avatarUrl:string,
    rankScore:number
}
@ccclass
export default class SnakeBase extends CompBase {
    playerInfo:I_snakeInfo
    speed:number = 5
    useSkillSpeedMul:number
    curPos:DecimalVec
    curDir:number
    targetDir:number = gameDefine.defaultDir

    frameSpeed:number = 1
    velocity:number[] = []
    snapshotData:{pos:DecimalVec,dir:number}
    start () {
        super.start();
        this.onEvent("logicUpdate",this.logicUpdate.bind(this));
        this.onEvent("reelBackToServerFrame",this.reelBackToServerFrame.bind(this));
    }
    init(data:{initPos:cc.Vec3,dir:number,playerInfo:I_snakeInfo}){
        this.playerInfo = data.playerInfo;
        this.curPos = new DecimalVec(data.initPos.x,data.initPos.y,data.initPos.z);
        this.curDir = data.dir;
        this.node.position = data.initPos;
        this.node.angle = data.dir;
    }
    private getMoveEndPos(frameData:{dir:number,isUseSkill:boolean}){
        let mul = frameData.isUseSkill?this.useSkillSpeedMul:1;
        let dirVec = FMath.getVec2ForDir(frameData.dir);
        let moveVec = dirVec.mul(new Decimal(this.speed*mul));
        let endVec = new DecimalVec(this.curPos.x,this.curPos.y,this.curPos.z).add(moveVec);
        return endVec;
    }
    readFrame(frameId?:number){
        let playType = game.roomData.readFrame(this.playerInfo.uid,frameId);
        return playType;
    }
    parsePlayType(playType){
        let dir = this.curDir;
        let isUseSkill = false;
        if(playType){
            dir = Math.floor(playType/10);
            isUseSkill = (playType%10) == 1
        }
        let frameData:{dir:number,isUseSkill:boolean} = {
            dir:dir,
            isUseSkill:isUseSkill
        };
        return frameData
    }
    useSnapshot(){
        this.curDir = this.snapshotData.dir;
        this.curPos = this.snapshotData.pos
    }
    takeSnapshot(){
        this.snapshotData = {
            pos:this.curPos,
            dir:this.curDir
        }
    }
    reelBackToServerFrame(frameId){
        this.updateTransfrom(1,this.readFrame(frameId),frameId);
        this.takeSnapshot();
    }
    logicUpdate(frameSpeed:number){
        this.updateTransfrom(frameSpeed,this.readFrame());
        this.takeSnapshot();
    }
    updateTransfrom(frameSpeed:number,playType:number,frameId?){
        let frameData = this.parsePlayType(playType);
        let lastDir = this.curDir;
        this.curPos = this.getMoveEndPos(frameData);
        this.targetDir = frameData.dir;
        this.curDir = FMath.rotateTowards(lastDir,this.targetDir,gameDefine.frameChangeAngle);
        this.frameSpeed = frameSpeed;
        this.velocity = [];
    }

    protected update(dt: number): void {
        this.node.position = FMath.slerpV3(this.node.position,this.curPos.getVec3(),this.velocity,dt,gameDefine.frameDt/this.frameSpeed);
        this.node.angle = FMath.slerpAngle(this.node.angle,this.curDir,this.velocity,dt,gameDefine.frameDt/this.frameSpeed)
    }
    // update (dt) {}
}
