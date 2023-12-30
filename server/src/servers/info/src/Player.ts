// import { gameLog } from "../common/logger";
// import { friendState, I_friendInfo_client, I_roleAllInfo, I_roleAllInfoClient, I_roleMem, I_uidsid } from "../common/someInterface";
// import { svr_info } from "./svr_info";
// import { constKey } from "../common/someConfig";
// import { app } from "mydog";
// import { nowMs } from "../common/time";
// import { cmd } from "../../config/cmd";
// import { getBit, getDiffDays, randArrElement, setBit, timeFormat } from "../util/util";
// import { MapIdMgr } from "../svr_map/mapIdMgr";
// import { I_playerMapJson } from "../../servers/map/handler/main";
// import { cfg_all, I_cfg_mapDoor } from "../common/configUtil";
// import { Bag, I_item } from "./bag";
// import { Equipment } from "./equipment";
// import { j2x2 } from "../svr_map/map";

import { I_roleInfo, I_roleMem } from "../../../common/interface/IInfo";
import { Quip } from "./Quip";
import { Bag } from "./Bag";
import { InfoConfig } from "./InfoConfig";

export class Player {
    public uid: number;
    public delThisTime:number = 0;
    public roomInfo?: I_roleMem;
    public role?: I_roleInfo;
    public bag?: Bag;
    public equip?: Quip;

    constructor(uid:number,callBack:()=>void) {
        this.uid = uid;
        this.queryAllInfo(callBack);
    }
    queryAllInfo(callBack:()=>void){
        setTimeout(()=>{
            if(callBack){
                callBack()
            }
        },500)
    }
    private online() {
        this.delThisTime = 0;
    }

    offline() {
        this.delThisTime = game.timeMgr.getCurTime() + InfoConfig.offLineInfoCleanTime;
    }
    doSqlUpdate(){
        this.bag?.doSqlUpdate();
        this.equip?.doSqlUpdate();
    }
    update(){
        this.bag?.update();
        this.equip?.update();
    }
   
}