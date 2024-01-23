import { e_InfoType, I_roleInfo, I_roleMem } from "../../../common/interface/IInfo";
import { Asset } from "./Asset";
import { InfoConfig } from "./InfoConfig";
export class Player {
    public uid: number;
    public delThisTime:number = 0;
    public roomInfo?: I_roleMem;
    public role?: I_roleInfo;
    public asset?: Asset;
    public isInit:boolean = false;

    constructor(role:I_roleInfo) {
        this.uid = role.uid;
        this.role = role;
        this.init();
    }
    init(){
        for(let i in e_InfoType){
            if(i == e_InfoType.asset){
                this.asset = new Asset(this)
            }
        }
    }
    getInfo(infoType:e_InfoType):Promise<any>{
       if(infoType == e_InfoType.asset){
            return this.asset!.getInfo();
        }else{
            return new Promise((resolve,reject)=>{
                resolve(this.role);
            })
        }
    }
    public setRoomInfo(roomInfo:{roomId:number,roomIp:string}){
        this.roomInfo = {
            roomId:roomInfo.roomId,
            roomIp:roomInfo.roomIp
        }
    }
    public getRoomInfo(){
        return this.roomInfo;
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
   
}