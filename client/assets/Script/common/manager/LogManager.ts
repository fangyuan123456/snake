import { SingleBase } from "../base/SingleBase";

export class LogManager extends SingleBase{
    debug(str,...parm){
        console.log(str,...parm);
    }
    error(str,...parm){
        console.error(str,...parm);
    }
}