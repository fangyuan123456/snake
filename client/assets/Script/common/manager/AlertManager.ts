import { SingleBase } from "../base/SingleBase";

export class AlertManager extends SingleBase{
    constructor(){
        super();
    }
    showAlert(data:{title?:string,content?:string,btnCallBackList?:{text?:string,callBack?:()=>void}[]}){
        game.panelMgr.openPanel("AlertPanel",{parmeter:data});
    }
}