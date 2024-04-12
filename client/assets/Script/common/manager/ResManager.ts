import ItemNode from "../../prefabs/ItemNode";
import { SingleBase } from "../base/SingleBase";
import { I_item } from "../interface/I_Info";

export class ResManager extends SingleBase{
    async loadRes<T extends cc.Asset>(url:string,type:{prototype:T},bundleName?:string): Promise<T>{
        return new Promise(async (resolve, reject)=>{
            let bundle:cc.AssetManager.Bundle  = null;
            if(bundleName){
                bundle = await this.loadBundle(bundleName)
            }else{
                bundle = cc.resources;
            }
            bundle.load<T>(url,type,(err,res:T)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(res) ;
                }
            })
        })
    }
    async loadImgRemote(url:string): Promise<cc.SpriteFrame>{
        return new Promise(async (resolve, reject)=>{
            cc.assetManager.loadRemote(url,(err, data:any)=>{
                let sp = new cc.SpriteFrame(data)
                resolve(sp);
            })
        })
    }
    async loadBundle(bundleName:string): Promise<cc.AssetManager.Bundle>{
        return new Promise((resolve, reject)=>{
            let bundle = cc.assetManager.getBundle(bundleName);
            if(!bundle){
                 cc.assetManager.loadBundle(bundleName,(err,_bundle)=>{
                    if(err){
                        reject(err);
                    }else{
                        resolve(_bundle) ;
                    }
                })
            }else{
                resolve(bundle)
            }  
        })
    }
    getRes<T extends cc.Asset>(url:string,type:{prototype:T},bundleName?:string){
        let bundle = cc.assetManager.getBundle(bundleName);
        if(bundle){
            return bundle.get(url,type);
        }
    }
    setSpImg(sp:cc.Node,url:string,callBack?:()=>void,isRemote?:boolean,bundleName?:string){
        if(isRemote){
            this.loadImgRemote(url).then((spriteFrame)=>{
                sp.getComponent(cc.Sprite).spriteFrame = spriteFrame
                if(callBack){
                    callBack()
                }
            })
        }else{
            this.loadRes(url,cc.SpriteFrame,bundleName).then((spriteFrame)=>{
                sp.getComponent(cc.Sprite).spriteFrame = spriteFrame
                if(callBack){
                    callBack()
                }
            })
        }
    }
    setPlayerIcon(sp:cc.Node,url:string,callBack?:()=>void){
        let isRemote = true;
        if(!url || url == ""){
            url = "pic/default"
            isRemote = false;
        }
        this.setSpImg(sp,url,callBack,isRemote)
    }
    createItem(data:{item:I_item,scale?:number},parent:cc.Node){
        this.loadRes("prefabs/ItemNode",cc.Prefab).then((prefab:cc.Prefab)=>{
            let node = cc.instantiate(prefab);
            parent.addChild(node);
            if(data.scale){
                node.scale = data.scale;
            }
            let comp = node.getComponent(ItemNode);
            comp.setItemData(data);
        })
    }
    createRankLevelIcon(parent:cc.Node,rankScore:number){
        let rankLevel = game.utilsMgr.getRankLevel(rankScore).level;
        this.loadRes("pic/ranking/rankLevelSp"+rankLevel,cc.SpriteFrame).then((spriteFrame)=>{
            let node = new cc.Node();
            let sp = node.addComponent(cc.Sprite);
            sp.spriteFrame = spriteFrame;
            parent.addChild(node);
        })
    }
    loadJson(cfgName:string,bundleName?:string){
        return new Promise<any>((resolve, reject) => {
            this.loadRes<cc.JsonAsset>(cfgName,cc.JsonAsset,bundleName).then((jsonAsset)=>{
                resolve(jsonAsset.json) 
            })
        })
 
    }
    loadCfg(cfgName:string,bundleName?:string){
        return new Promise<any>(async (resolve, reject) => {
            let cfgStroge = game.storgeMgr.getCfgStroge(cfgName);
            if(!cfgStroge){
                cfgStroge = await this.loadJson("tableCfg/"+cfgName,bundleName);
            }
            resolve(cfgStroge);
        })
       
    }
}