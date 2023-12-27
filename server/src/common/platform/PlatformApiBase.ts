export class PlatformApiBase{
    constructor(){

    }
    getLoginCode(callBack:(data:any)=>void){
        if(callBack){
            callBack("");
        }
    }
}