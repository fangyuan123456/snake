import { SingleBase } from "../base/SingleBase";

export class AlertManager extends SingleBase{
    constructor(){
        super();
    }
    showTiShiBox(data:{title?:string,content?:string,btnCallBackList?:{text?:string,callBack?:()=>void}[]}){
        game.panelMgr.openPanel("TiShiBoxPanel",{parmeter:data});
    }
    showAlert(text:string){
        game.panelMgr.openPanel("AlertPanel");
    }
}