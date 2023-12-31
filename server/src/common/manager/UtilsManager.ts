import { Application } from "mydog";
import { SingleBase } from "../base/SingleBase";
import { serverType } from "../config/GameCfg";
import * as path from "path";

export class UtilsManager extends SingleBase{
    getInfoId(uid: number) {
        let infoArr =  game.app.serversConfig[serverType.info]
        return infoArr[uid % infoArr.length].id;
    }
    getCharLen(charCode: number) {
        if (charCode >= 48 && charCode <= 57) { // 0-9
            return 1;
        }
        if (charCode >= 65 && charCode <= 90) { // A-Z
            return 1;
        }
        if (charCode >= 97 && charCode <= 122) { // a-z
            return 1;
        }
        return 2;
    }
    getAppPath(){
        return path.join(__dirname,"../../servers/"+game.app.serverType)
    }
    capitalizeFirstLetter(str: string): string {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

}