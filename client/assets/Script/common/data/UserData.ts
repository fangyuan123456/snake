import { SingleBase } from "../base/SingleBase"

export default class UserData extends SingleBase{
    uid:number = 0
    nickName:string = ""
    avatarUrl:string = ""
    centerIp:string  = ""
    roomInfo:{roomId:number,roomIp:string}
    setLoginData(loginData){
        this.uid = loginData.uid,
        this.nickName = loginData.nickName
        this.avatarUrl = loginData.avatarUrl
        this.centerIp = loginData.centerIp
    }
    setRoomInfo(roomInfo){
        this.roomInfo = roomInfo
    }
}