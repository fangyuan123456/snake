import { SocketType } from "../Game";
import { CompBase } from "../base/CompBase"
import { SingleBase } from "../base/SingleBase"
import { Dic } from "../interface/I_Common";
export default class DataBase extends SingleBase{
    netDataKeyList:string[];
    netDatas?:Dic<any> = {};
    infoResolveMap:{[key:string]:any} = {};
    offLineReReqInfoList:string[] = []
    socketType:SocketType
    constructor(netDataKeyList?:string[],socketType:SocketType = SocketType.center){
        super();
        this.socketType = socketType;
        this.netDataKeyList = netDataKeyList;
        if(this.netDataKeyList){
            this.registerAllInfoMsg();
            this.getAllInfoFromServer();
        }
    }
    getAllInfoFromServer(){
        game.netMgr.onReady(()=>{
            for(let i in this.netDataKeyList){
                let key = this.netDataKeyList[i];
                let data = this.netDatas[key];
                if(!data || this.offLineReReqInfoList.indexOf(key)>=0){
                    let _infoName = game.utilsMgr.capitalizeFirstLetter(key);
                    let msgName = "get"+_infoName;
                    game.netMgr.sendSocket({
                        msgHead:msgName,
                    },null,this.socketType)
                }
            }
        })
    }
    registerAllInfoMsg(){
        for(let i in this.netDataKeyList){
            let key = this.netDataKeyList[i];
            let _infoName = game.utilsMgr.capitalizeFirstLetter(key);
            let msgName = "get"+_infoName;
            game.netMgr.onMsg(msgName,(data)=>{
                this.setInfo(key,data);
                this._callResolveFunc(key);
            })
        }
    }
    _callResolveFunc(dataKey:string){
        let data = this.netDatas[dataKey];
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
        this.netDatas[dataKey] = data;
    }
    protected getInfo(dataKey:string,target:CompBase):Promise<any>{
        let promise = new Promise((resolve,reject)=>{
            this.infoResolveMap[dataKey] =  this.infoResolveMap[dataKey]||[]
            this.infoResolveMap[dataKey].push({
                target:target,
                callBack:resolve
            });
        })
        this._callResolveFunc(dataKey);
        return promise;
    }
}