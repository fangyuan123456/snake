import { PanelBase } from "../base/PanelBase";
import { SingleBase } from "../base/SingleBase";
import { panelCfg } from "../configs/PanelCfg";
interface OpenStruct{
    closeCallBack?:()=>void,
    parmeter:any,
    parent?:cc.Node,
    ignoreSize?:boolean
}
export class PanelManager extends SingleBase{
    private opendPanel:{[key:string]:PanelBase[]} = {};
    async openPanel(panelName:string,data?:OpenStruct){
        let _panelCfg = panelCfg[panelName];
        if(_panelCfg){
            let prefab = game.resMgr.getRes<cc.Prefab>(_panelCfg.url,cc.Prefab,_panelCfg.bundleName);
            if(!prefab){
                prefab = await game.resMgr.loadRes<cc.Prefab>(_panelCfg.url,cc.Prefab,_panelCfg.bundleName)
            }
            let node = cc.instantiate(prefab);
            let panel = node.getComponent(PanelBase);
            if(panel){
                let parent = (data && data.parent) || cc.find("Canvas/pubUpPanel");
                let name = parent.name;
                panel.panelName = panelName;
                parent.addChild(node);
                panel.init(data);
                this.opendPanel[name] = this.opendPanel[name] || [];
                this.opendPanel[name].push(panel);
                game.eventMgr.dispatch("openPanelChange")
                return panel;
            }
        }
    }
    closePanel(panelName:string|PanelBase,parent?:cc.Node){
        parent = parent || cc.find("Canvas/pubUpPanel");
        let name = parent.name;
        let panelList = this.opendPanel[name];
        for(let i=panelList.length-1;i>=0;i--){
            let panel = panelList[i];
            if(panel == panelName || panel.panelName == panelName){
                panelList.splice(i);
                panel.playCloseAction(()=>{
                    panel.node.destroy();
                    game.timeMgr.scheduleOnce(()=>{
                        game.eventMgr.dispatch("openPanelChange")
                    },0.01)
                })
            }
          
        }
    }
}