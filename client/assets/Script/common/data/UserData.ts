import { SingleBase } from "../base/SingleBase"

export default class UserData extends SingleBase{
    uid:number = 0
    nickName:string = ""
    centerIp:string  = ""
    setLoginData(loginData){
        this.uid = loginData.uid,
        this.nickName = loginData.nickName
        this.centerIp = loginData.centerIp
    }
}