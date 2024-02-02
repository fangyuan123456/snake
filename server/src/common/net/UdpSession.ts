import { Dic, I_msg } from "../interface/ICommon";

export class UdpSession{
    dics:Dic<any> = {};
    uid: number;
    ip: string;
    constructor(uid:number,ip:string){
        this.uid = uid;
        this.ip = ip;
    }
    set(value: Dic<any>): void{
        this.dics = game.utilsMgr.merge(this.dics,value);
    };
    get<T = any>(key: number | string): T{
        return this.dics[key];
    };
    bind(uid: number): boolean{
        this.uid = uid;
        return true;
    };
    getIp():string{
        return this.ip
    }
    send(msg: I_msg): void{
        gameGame.udpServer.send(msg,this.ip)
    };
}