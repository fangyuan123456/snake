import { SingleBase } from "../base/SingleBase";
import { SocketMsgStruct } from "./NetManager";
export class ProtoManager extends SingleBase{
    decode(buffer):SocketMsgStruct{
        return {
            msgHead:"",
            msgData:{}
        };
    }
    encode(data:SocketMsgStruct){
        
    }
}