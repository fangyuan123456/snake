import { Session } from "mydog";
import { e_InfoType, I_asset, I_inviteReward, I_roleInfo, I_roleMem } from "../../../common/interface/IInfo";
import { Asset } from "./Asset";
import { InfoConfig } from "./InfoConfig";
import { Role } from "./Role";
import { InviteReward } from "./InviteReward";
export class Player{
    public uid: number;
    public delThisTime:number = 0;
    public roomInfo?: I_roleMem = {roomId:0,roomIp:""};
    public asset?: Asset;
    public role?:Role;
    public inviteReward?:InviteReward
    public isInit:boolean = false;

    constructor(uid:number,data?:{role?:I_roleInfo,asset?:I_asset,inviteReward?:I_inviteReward}) {
        this.uid = uid;
        this.init(data);
    }
    init(data?:{role?:I_roleInfo,asset?:I_asset,inviteReward?:I_inviteReward}){
        for(let i in e_InfoType){
            if(i == e_InfoType.asset){
                this.asset = new Asset(this,data?.asset);
            }else if(i == e_InfoType.role){
                this.role = new Role(this,data?.role);
            }else if(i == e_InfoType.inviteReward){
                this.inviteReward = new InviteReward(this,data?.inviteReward);
            }

        }
    }
    getInfo(infoType:e_InfoType):Promise<any>{
       if(infoType == e_InfoType.asset){
            return this.asset!.getInfo();
        }else if(infoType == e_InfoType.inviteReward){
            return this.inviteReward!.getInfo();
        }else{
            return this.role!.getInfo();
        }
    }
    public setRoomInfo(roomInfo:{roomId:number,roomIp:string}){
        this.roomInfo = {
            roomId:roomInfo.roomId,
            roomIp:roomInfo.roomIp
        }
    }
    onLine(){
        this.delThisTime = 0;
    }
    offline() {
        this.delThisTime = game.timeMgr.getCurTime() + InfoConfig.offLineInfoCleanTime;
    }
    doSqlUpdate(){
        for(let i in e_InfoType){
            //@ts-ignore
            this[e_InfoType[i]]?.doSqlUpdate();
        }
    }
    update(){
        for(let i in e_InfoType){
            //@ts-ignore
            if(this[e_InfoType[i]]&&this[e_InfoType[i]]?.updateDt){
                //@ts-ignore
                this[e_InfoType[i]]?.updateDt();
            }
        }
    }
   
    getRoomInfoHandler(msg: {}, session: Session, next: Function){
        next(this.roomInfo)
    }
    getRoleInfoHandler(msg: {}, session: Session, next: Function){
        this.getInfo(e_InfoType.role).then((data)=>{
            next(data)
        })
    }
    getAssetInfoHandler(msg: {}, session: Session, next: Function){
        this.getInfo(e_InfoType.asset).then((data)=>{
            next(data)
        })
    }
    getInviteRewardInfoHandler(msg: {}, session: Session, next: Function){
        this.getInfo(e_InfoType.inviteReward).then((data)=>{
            next(data)
        })
    }
}