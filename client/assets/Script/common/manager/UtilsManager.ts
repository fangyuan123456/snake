import { SingleBase } from "../base/SingleBase";
import { rankLevelCfg } from "../configs/CommonCfg";
import SensitivityConfig from "../components/SensitivityConfig";
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
    getRankLevel(score:number){
      for(let i  = rankLevelCfg.length - 1;i>=0;i--){
        let cfg = rankLevelCfg[i];
        if(cfg.score<=score){
          return {
            level:i+1,
            score:cfg.score,
            name:cfg.name
          }  
        }
      }
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
    merge(map:{[key:string]:any},newMap:{[key:string]:any}){
      for(let i in newMap){
          map[i] = newMap[i];
      }
      return map;
    }
    comporeVersion(versionStr1:string,versionStr2:string){
      let versionList1 = versionStr1.split(".");
      let versionList2 = versionStr2.split(".");
      for (let i = 0; i < versionList1.length; i++) {
          if(versionList1[i]<versionList2[i]){
              return true;
          }
      }
      return false;
  }

}