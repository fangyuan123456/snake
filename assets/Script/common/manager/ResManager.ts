import { SingleBase } from "../base/SingleBase";

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
}