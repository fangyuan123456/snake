import { SocketType } from "../Game";
import { CompBase } from "../base/CompBase"
import { SingleBase } from "../base/SingleBase"
import { Dic } from "../interface/I_Common";
export type dataKeyCfg = Dic<{isConnectReq:boolean,ignoreHaveData?:boolean}>
export default class DataBase extends SingleBase{
    netDatas?:Dic<any> = {};
    infoResolveMap:{[key:string]:any} = {};
    socketType:SocketType
    dataKeyCfg?:dataKeyCfg
    isInfoReq:Dic<boolean> = {}
    constructor(dataKeyCfg?:dataKeyCfg,socketType:SocketType = SocketType.center){
        super();
        this.socketType = socketType;
        this.dataKeyCfg = dataKeyCfg;
        if(this.dataKeyCfg){
            this.registerAllInfoMsg();
            this.getAllInfoFromServer();
        }
    }
    getAllInfoFromServer(){
        game.netMgr.onReady(()=>{
            for(let i in this.dataKeyCfg){
                let key = i;
                let data = this.dataKeyCfg[i];
                if((data.ignoreHaveData || !this.netDatas[i])&&data.isConnectReq){
                    this.requestInfo(key);
                }
            }
        })
    }
    private requestInfo(key:string){
        if(this.isInfoReq[key]){
            return;
        }
        let _infoName = game.utilsMgr.capitalizeFirstLetter(key);
        let msgName = "get"+_infoName;
        game.netMgr.sendSocket({
            msgHead:msgName,
        },()=>{
            this.isInfoReq[key] = false;
        },this.socketType)
    }
    registerAllInfoMsg(){
        for(let i in this.dataKeyCfg){
            let key = i;
            let _infoName = game.utilsMgr.capitalizeFirstLetter(key);
            let msgName = "get"+_infoName;
            game.netMgr.onMsg(msgName,(data)=>{
                this.setInfo(key,data);
                this._callResolveFunc(key);
            })
        }
    }
    _callResolveFunc(dataKey:string,data?:any){
         data = data||this.netDatas[dataKey];
        if(data){
            let resoleCallList = this.infoResolveMap[dataKey];
            if(resoleCallList){
                for(let i = resoleCallList.length-1;i>=0;i--){
                    let target = resoleCallList[i].target;
                    let callBack = resoleCallList[i].callBack;
                    if(target && target.node && target.node.parent){
                        callBack(data);
                    }else{
                        resoleCallList.splice(i,1);
                    }
                } 
            }
        }
    }
    protected setInfo(dataKey:string,data){
        this.netDatas[dataKey] = this.netDatas[dataKey] || {};
        game.utilsMgr.merge(this.netDatas[dataKey],data);
        let _infoName = game.utilsMgr.capitalizeFirstLetter(dataKey);
        if(this["set"+_infoName]){
            this.netDatas[dataKey] = data;
        }
    }
    protected getInfo(dataKey:string,callBack:(any)=>void,target:CompBase){
        if(!this.netDatas[dataKey]){
            this.requestInfo(dataKey);
        }
        this.infoResolveMap[dataKey] =  this.infoResolveMap[dataKey]||[]
        this.infoResolveMap[dataKey].push({
            target:target,
            callBack:callBack
        });
        this._callResolveFunc(dataKey);
    }
    public getInfoSync(dataKey:string){
        return this.netDatas[dataKey];
    }
}