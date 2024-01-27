import { SingleBase } from "../base/SingleBase";
import SensitivityConfig from "../data/SensitivityConfig";
export class UtilsManager extends SingleBase{
    getNodeInTargetPos(node:cc.Node,targetPos:cc.Node,pos:cc.Vec2 = cc.v2(0,0)){
        let worldPos = node.convertToWorldSpace(pos);
        let convertPos = targetPos.convertToNodeSpace(worldPos);
        return convertPos;
    }
    capitalizeFirstLetter(str: string): string {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    getWordSensitivityStr(word:string){
        var pattern = /[\s`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/img;
        var word_ = word.replace(pattern, '');
        for(var i=0; i<SensitivityConfig.length; i++){
            if(SensitivityConfig[i]=="")continue;
            if(word_.indexOf(SensitivityConfig[i]) != -1){
                word = word.replace(SensitivityConfig[i], '***');
            }
        }
        return word;
    }
    deepCopy(obj: any): any {
        if (typeof obj !== 'object' || obj === null) {
          return obj;
        }
        let copy;
        if (Array.isArray(obj)) {
          copy = [];
      
          for (let i = 0; i < obj.length; i++) {
            copy[i] = this.deepCopy(obj[i]);
          }
        } else {
          copy = {};
          for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
              //@ts-ignore
              copy[key] = this.deepCopy(obj[key]);
            }
          }
        }
        return copy;
    }

}