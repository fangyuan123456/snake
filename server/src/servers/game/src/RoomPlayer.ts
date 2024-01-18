import { serverType } from "../../../common/config/GameCfg";
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
        let callInitResolve=()=>{
            for(let i in this.initResolveList){
                let resolve = this.initResolveList[i];
                resolve(this);
            }
        }
        game.app.rpc(game.utilsMgr.getSid(this.uid,serverType.info)).info.main.getRoomPlayerInfo(this.uid).then((data:any)=>{
            this.role = data.role;
            this.isInit = true;
            callInitResolve();
        })
    }
    getMyInfo():Promise<RoomPlayer>{
        return new Promise((resolve,reject)=>{
            if(this.isInit){
                resolve(this);
            }
        })
    }
}