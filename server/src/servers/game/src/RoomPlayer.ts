import { serverType } from "../../../common/config/CommonCfg";
import { Dic } from "../../../common/interface/ICommon";
import { I_asset, I_roleInfo } from "../../../common/interface/IInfo";
import { Room } from "./Room";
type resolveFunc = (data:any)=>void;
export class RoomPlayer{
    public uid:number;
    public role?: I_roleInfo;
    public asset?: I_asset;
    private initResolveList:resolveFunc[] = [];
    private isInit:boolean = false;
    private isOnLine:boolean = false;
    public isEnterGame:boolean = false;
    public clientReceiveFrameId:number = 0;
    private userInputList:number[] = [];
    private newUserInput:number = 0;
    private room:Room;
    constructor(room:Room,uid:number){
        this.room = room;
        this.uid = uid;
        game.app.rpc(game.utilsMgr.getSid(this.uid,serverType.info)).info.main.getRoomPlayerInfo(this.uid).then((data:{roleInfo:I_roleInfo,assetInfo:I_asset})=>{
            this.role = data.roleInfo;
            this.asset = data.assetInfo
            this.isInit = true;
            this.callInitResolve();
        })
    }
    frameMsg(msg:{frameId:number,frameType:number}){
        this.clientReceiveFrameId = msg.frameId;
        this.newUserInput = msg.frameType;
    }
    getFrames(frameId:number){
        return this.userInputList.slice(frameId-1)
    }
    pushInFrameData(){
        this.userInputList.push(this.newUserInput);
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
    onLine(){
        this.isOnLine = true;
    }
    offLine(){
        this.isOnLine = false;
    }
    update(){
        this.pushInFrameData();
    }
}