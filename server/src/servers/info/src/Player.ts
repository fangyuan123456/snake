import { I_roleInfo, I_roleMem } from "../../../common/interface/IInfo";
import { Bag } from "./Bag";
import { InfoConfig } from "./InfoConfig";
import { TableName } from "../../../common/manager/SqlManager";
type resolveFunc = (value: unknown) => void 
export class Player {
    public uid: number;
    public delThisTime:number = 0;
    public roomInfo?: I_roleMem;
    public role?: I_roleInfo;
    public bag?: Bag;
    public isInit:boolean = false;
    public queryResolveList:resolveFunc[]=  []

    constructor(role:I_roleInfo) {
        this.uid = role.uid;
        this.role = role;
        this.queryAllInfo();
    }
    queryAllInfo(){
        if(!this.isInit){
            new Promise(async (resolve,reject)=>{
                this.bag = new Bag(this)
                await this.bag.init();
                resolve(this);
            }).then(()=>{
                this.isInit = true;
                for(let i in this.queryResolveList){
                    this.queryResolveList[i](this);
                }
            })
        }
    }
    public getPlayerInfo(){
        return new Promise((resolve,reject)=>{
            if(this.isInit){
                resolve(this);
            }else{
                this.queryResolveList.push(resolve);
            }
        })
    }
    private online() {
        this.delThisTime = 0;
    }

    offline() {
        this.delThisTime = game.timeMgr.getCurTime() + InfoConfig.offLineInfoCleanTime;
    }
    doSqlUpdate(){
        this.bag?.doSqlUpdate();
    }
    update(){
        this.bag?.update();
    }
   
}