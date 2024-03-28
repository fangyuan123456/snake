import { BundleBase } from "../base/BundleBase";
import { SingleBase } from "../base/SingleBase";
import { Dic, e_bundleName } from "../interface/I_Common";
export type bundleDelegateFunc = ((parmater?:any)=>void)
export enum e_bundleState{
    Progress,
    Completed
}
export class BundleManager extends SingleBase{
    bundleMap:Dic<BundleBase> = {}
    bundleStateMap:Dic<boolean> = {}
    delegateList:Dic<Dic<bundleDelegateFunc[]>> = {};
    private getDelegateCallList(bundleName:e_bundleName,bundleState:e_bundleState){
        this.delegateList[bundleName] = this.delegateList[bundleName] || {};
        this.delegateList[bundleName][bundleState] = this.delegateList[bundleName][bundleState] || [];
        return this.delegateList[bundleName][bundleState];
    }
    private callDelegateFunc(bundleName:e_bundleName,bundleState:e_bundleState,parmater?:any){
        let delegateList = this.getDelegateCallList(bundleName,bundleState);
        for(let i in delegateList){
            delegateList[i](parmater);
        }
        if(bundleState == e_bundleState.Completed){
            this.delegateList[bundleName] = null;
        }
    }
    addBundle(bundleName:e_bundleName,progressCallBack?:(precent:number,title:string)=>void){
        return new Promise<BundleBase>((resolve, reject) => {
            let bundle = this.getBundle(bundleName);
            if(bundle){
                resolve(bundle);
            }else{
                this.setDelegate(bundleName,e_bundleState.Progress,(parmater)=>{
                    progressCallBack(parmater.precent,parmater.title)
                });
                this.setDelegate(bundleName,e_bundleState.Completed,(bundleComp)=>{
                    resolve(bundleComp);
                });
                if(!this.bundleStateMap[bundleName]){
                    this.bundleStateMap[bundleName] = true;
                    game.resMgr.loadBundle(bundleName).then((bundle)=>{
                        let bundleNode = new cc.Node(bundleName);
                        game.getPersistNode().addChild(bundleNode);
                        let comp = bundleNode.addComponent(bundleName) as BundleBase;
                        comp.preLoad((precent,title)=>{
                            this.callDelegateFunc(bundleName,e_bundleState.Progress,{
                                precent:precent,
                                title:title
                            });
                        }).then(()=>{
                            this.bundleStateMap[bundleName] = false;
                            this.bundleMap[bundleName] = comp;
                            this.callDelegateFunc(bundleName,e_bundleState.Completed,comp);
                        })
                    });
                }
            }
        })
    }
    getBundle(bundleName:e_bundleName){
        return this.bundleMap[bundleName];
    }
    removeBundle(bundleName:e_bundleName){
        let bundleComp = this.getBundle(bundleName);
        cc.assetManager.removeBundle(bundleComp.bundle);
        bundleComp.node.removeFromParent(true);
        this.bundleMap[bundleName] = null;
    }
    setDelegate(bundleName:e_bundleName,bundleState:e_bundleState,delegateFunc:bundleDelegateFunc){
        this.getDelegateCallList(bundleName,bundleState).push(delegateFunc)
    }

}