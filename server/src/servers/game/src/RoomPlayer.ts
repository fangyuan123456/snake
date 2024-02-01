import { serverType } from "../../../common/config/CommonCfg";
import { I_roleInfo } from "../../../common/interface/IInfo";
type resolveFunc = (data:any)=>void;
export class RoomPlayer{
    public uid:number;
    public role?: I_roleInfo;
    public asset?: any;
    public initResolveList:resolveFunc[] = [];
    public isInit:boolean = false;
    constructor(uid:number){
        this.uid = uid;
        game.app.rpc(game.utilsMgr.getSid(this.uid,serverType.info)).info.main.getRoomPlayerInfo(this.uid).then((data:any)=>{
            this.role = data.role;
            this.isInit = true;
            this.callInitResolve();
        })
    }
    callInitResolve(){
        if(this.isInit){
            for(let i = this.initResolveList.length-1;i>=0;i--){
                let resolve = this.initResolveList[i];
                resolve(this);
                this.initResolveList.splice(Number(i),1);
            }
        }
    }
    getMyInfo():Promise<RoomPlayer>{
        return new Promise((resolve,reject)=>{
            this.initResolveList.push(resolve);
            this.callInitResolve();
        })
    }
}