import { SingleBase } from "../base/SingleBase";

export class UtilsManager extends SingleBase{
    getNodeInTargetPos(node:cc.Node,targetPos:cc.Node,pos:cc.Vec2 = cc.v2(0,0)){
        let worldPos = node.convertToWorldSpace(pos);
        let convertPos = targetPos.convertToNodeSpace(worldPos);
        return convertPos;
    }
}