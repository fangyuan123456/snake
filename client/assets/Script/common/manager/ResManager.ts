import Item from "../../prefabs/Item";
import { SingleBase } from "../base/SingleBase";
import { I_item } from "../interface/I_Info";

export class ResManager extends SingleBase{
    async loadRes<T extends cc.Asset>(url:string,bundleName?:string): Promise<T>{
        return new Promise(async (resolve, reject)=>{
            let bundle:cc.AssetManager.Bundle  = null;
            if(bundleName){
                bundle = await this.loadBundle(bundleName)
            }else{
                bundle = cc.resources;
            }
            bundle.load<T>(url,(err,res:T)=>{
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
    getRes<T extends cc.Asset>(url:string,bundleName?:string){
        let bundle = cc.assetManager.getBundle(bundleName);
        if(bundle){
            return bundle.get<T>(url);
        }
    }
    setSpImg(sp:cc.Node,url:string,callBack?:()=>void,isRemote?:boolean){
        if(isRemote){
            this.loadImgRemote(url).then((spriteFrame)=>{
                sp.getComponent(cc.Sprite).spriteFrame = spriteFrame
                if(callBack){
                    callBack()
                }
            })
        }else{
            this.loadRes<cc.SpriteFrame>(url).then((spriteFrame)=>{
                sp.getComponent(cc.Sprite).spriteFrame = spriteFrame
                if(callBack){
                    callBack()
                }
            })
        }
    }
    createItem(data:{item:I_item,scale?:number},parent:cc.Node){
        this.loadRes<cc.Prefab>("prefabs/Item").then((prefab:cc.Prefab)=>{
            let node = cc.instantiate(prefab);
            parent.addChild(node);
            if(data.scale){
                node.scale = data.scale;
            }
            let comp = node.getComponent(Item);
            comp.setItemData(data);
        })
    }
}