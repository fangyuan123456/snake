import { SingleBase } from "../base/SingleBase";

export class AduintManager extends SingleBase{
    playVideoAd(){
        return new Promise<boolean>((resolve, reject) => {
            resolve(true);
        })
    }
}