import { serverType } from "../../../common/config/CommonCfg";
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
    public clientCurFrameId:number = 0;
    private playTypeMap:{[key:number]:number} = [];
    private newFrameType:number|null = 0;
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
        this.clientCurFrameId = msg.frameId;
        this.newFrameType = msg.frameType;
    }
    getFrames(frameId:number){
        let frames:number[] = [];
        for(let i in this.playTypeMap){
            let playFrameId = Number(i);
            if(playFrameId>frameId){
                frames.push(playFrameId*10+this.playTypeMap[i]);
            }
        }
        return frames;
    }
    pushInFrameData(){
        if(this.newFrameType){
            this.playTypeMap[this.room.frameId] = this.newFrameType;
            this.newFrameType = null;
        }
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