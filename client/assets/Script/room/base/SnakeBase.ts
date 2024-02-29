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
    targetDir:number

    frameSpeed:number
    velocity:number[] = []
    start () {
        super.start();
        this.onEvent("logicUpdate",this.logicUpdate.bind(this));
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
    readFrame(){
        let playType = game.roomData.readFrame(this.playerInfo.uid);
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
    private getTargetDir(lastDir:number,curDir:number){
        let targetDir = 0;
        if(curDir>=lastDir){
            return Math.min(curDir,lastDir+gameDefine.frameChangeAngle)
        }
        return targetDir
    }
    logicUpdate(frameSpeed:number){
        let frameData = this.readFrame();
        let lastDir = this.curDir;
        let lastPos = this.curPos;
        this.curPos = this.getMoveEndPos(frameData);
        this.curDir = frameData.dir;
        this.targetDir = this.getTargetDir(lastDir,this.curDir);

        this.frameSpeed = frameSpeed;
        this.velocity = [];
        this.node.position = lastPos.getVec3();
        this.node.angle = lastDir
    }
    protected update(dt: number): void {
        this.node.position = FMath.slerpV3(this.node.position,this.curPos.getVec3(),this.velocity,dt,gameDefine.frameDt/this.frameSpeed);
        this.node.angle = FMath.slerp(this.node.angle,this.curDir,this.velocity,dt,gameDefine.frameDt/this.frameSpeed)
    }

    // update (dt) {}
}
