import { CompBase } from "../base/CompBase"
import { SingleBase } from "../base/SingleBase"
export enum InfoType{
    roleInfo="roleInfo",
    assestInfo = "assestInfo",
    roomInfo = "roomInfo"
}
export type I_roleInfo = {uid:number,nickName:string,avatarUrl:string};
export type I_roomInfo = {roomId:number,roomIp:string};
export type I_assestInfo = {};

export default class UserData extends SingleBase{
    uid:number = 0
    centerIp:string  = ""
    roleInfo:I_roleInfo
    roomInfo:I_roomInfo
    assestInfo:I_assestInfo
    infoResolveMap:{[key:string]:any} = {};
    setLoginData(loginData){
        this.uid = loginData.uid,
        this.centerIp = loginData.centerIp
        this.setInfo(InfoType.roleInfo,{uid:loginData.uid,nickName:loginData.nickName,avatarUrl:loginData.avatarUrl})
    }
    registerAllInfoMsg(){
        for(let i in InfoType){
            let infoName = InfoType[i];
            let _infoName = game.utilsMgr.capitalizeFirstLetter(infoName);
            let msgName = "get"+_infoName;
            game.netMgr.onMsg(msgName,(data)=>{
                this.setInfo(infoName,data);
                this._callResolveFunc(infoName);
            })
        }
    }
    _callResolveFunc(infoType:InfoType){
        let info = this[infoType];
        let resoleCallList = this.infoResolveMap[infoType];
        if(resoleCallList){
            for(let i = resoleCallList.length-1;i>=0;i--){
                let target = resoleCallList[i].target;
                let callBack = resoleCallList[i].callBack;
                if(target && target.node.parent){
                    callBack(info);
                }else{
                    resoleCallList.splice(i,1);
                }
            } 
        }
    }
    setInfo(infoType,data){
        this[infoType] = data;
    }
    private getInfo(infoType:InfoType,target:CompBase,isReq?:boolean):Promise<any>{
        let promise = new Promise((resolve,reject)=>{
            this.infoResolveMap[infoType] =  this.infoResolveMap[infoType]||[]
            this.infoResolveMap[infoType].push({
                target:target,
                callBack:resolve
            });
        })
        if(!this[infoType] || isReq){
            let _infoName = game.utilsMgr.capitalizeFirstLetter(infoType);
            let msgName = "get"+_infoName;
            game.netMgr.sendSocket({
                msgHead:msgName,
            })
        }else{
            this._callResolveFunc(infoType);
        }
        return promise;
    }
    getRoleInfo(target:CompBase,isReq?:boolean):Promise<I_roleInfo>{
        return this.getInfo(InfoType.roleInfo,target,isReq)
    }
    getRoomInfo(target:CompBase,isReq?:boolean):Promise<I_roomInfo>{
        return this.getInfo(InfoType.roomInfo,target,isReq)
    }
    getAssetInfo(target:CompBase,isReq?:boolean):Promise<I_assestInfo>{
        return this.getInfo(InfoType.assestInfo,target,isReq)
    }
}