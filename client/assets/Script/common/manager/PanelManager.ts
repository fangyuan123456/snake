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
            let prefab = game.resMgr.getRes<cc.Prefab>(_panelCfg.url,_panelCfg.bundleName);
            if(!prefab){
                prefab = await game.resMgr.loadRes<cc.Prefab>(_panelCfg.url,_panelCfg.bundleName)
            }
            let node = cc.instantiate(prefab);
            let panel = node.getComponent(PanelBase);
            if(panel){
                let parent = (data && data.parent) || cc.find("Canvas/pubUpPanel");
                let name = parent.name;
                panel.panelName = panelName;
                parent.addChild(node);
                if(data){
                    panel.init(data.parmeter,data.closeCallBack);
                }
                this.opendPanel[name] = this.opendPanel[name] || [];
                this.opendPanel[name].push(panel);
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
            if(panelName == panel){
                panel.playCloseAction(()=>{
                    panel.node.destroy();
                })
            }else{
                if(panel.panelName == panelName){
                    panel.playCloseAction(()=>{
                        panel.node.destroy();
                    })
                }
            }
          
        }
    }
}