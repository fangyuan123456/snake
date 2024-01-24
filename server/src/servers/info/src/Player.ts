import { Session } from "mydog";
import { e_InfoType, I_asset, I_roleInfo, I_roleMem } from "../../../common/interface/IInfo";
import { Asset } from "./Asset";
import { InfoConfig } from "./InfoConfig";
import { Role } from "./Role";
export class Player{
    public uid: number;
    public delThisTime:number = 0;
    public roomInfo?: I_roleMem = {roomId:0,roomIp:""};
    public asset?: Asset;
    public role?:Role;
    public isInit:boolean = false;

    constructor(uid:number,data?:{role?:I_roleInfo,asset?:I_asset}) {
        this.uid = uid;
        this.init(data);
    }
    init(data?:{role?:I_roleInfo,asset?:I_asset}){
        for(let i in e_InfoType){
            if(i == e_InfoType.asset){
                this.asset = new Asset(this,data?.asset);
            }else if(i == e_InfoType.role){
                this.role = new Role(this,data?.role);
            }

        }
    }
    getInfo(infoType:e_InfoType):Promise<any>{
       if(infoType == e_InfoType.asset){
            return this.asset!.getInfo();
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
    public updateInviteData(inviteUid:number){
        this.role!.updateInviteData(inviteUid);
    }
    private online() {
        this.delThisTime = 0;
    }

    offline() {
        this.delThisTime = game.timeMgr.getCurTime() + InfoConfig.offLineInfoCleanTime;
    }
    doSqlUpdate(){
        this.asset?.doSqlUpdate();
    }
    update(){
        this.asset?.update();
    }
   






    getRoomInfo(msg: {}, session: Session, next: Function){
        next(this.roomInfo)
    }
    getRoleInfo(msg: {}, session: Session, next: Function){
        this.getInfo(e_InfoType.role).then((data)=>{
            next(data)
        })
    }
    getAssetInfo(msg: {}, session: Session, next: Function){
        this.getInfo(e_InfoType.asset).then((data)=>{
            next(data)
        })
    }
}