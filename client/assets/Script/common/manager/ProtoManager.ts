import { SingleBase } from "../base/SingleBase";
import { MSG_TYPE } from "../base/SocketBase";
import { SocketMsgStruct } from "./NetManager";
import { Root, Type, load, loadSync } from "protobufjs";
export class ProtoManager extends SingleBase{
    protoRoot:{[key:string]:Root}  = {};
    decodeFuncMap:{[key:string]:{[key:string]:Type}}  = {};
    msgList = []
    constructor(){
        super();
        this.msgList = [];
    }
    getEncodeDecodeFunc(pkName:string,pbName:string){
        if(!this.decodeFuncMap[pkName][pbName]){
            let root = this.protoRoot[pkName];
            if(!root){
                root = loadSync("../proto/"+pbName+".proto")
                this.protoRoot[pkName] = root;
            }
            this.decodeFuncMap[pkName][pbName] = root.lookupType(pbName);
        }
        return this.decodeFuncMap[pkName][pbName]
      }
    setMsgCodeList(routeStrList:string[]){
        for(let i in routeStrList){
            let strList = routeStrList[i].split(".");
            let packageName = strList[strList.length-2];
            let msgName = strList[strList.length-1];
            this.msgList[i] = {
                packageName:packageName,
                msgName:msgName
            };
        }
    }
    getMsgDecodeFuncName(protoCode,isReq = false){
        let obj = this.msgList[protoCode];
        return obj.packageName+"."+obj.msgName+isReq?"Req":"Res";
    }
    getMsgDecodeProto(msgName){
        let name = msgName.split("Re")[0];
        for(let i in this.msgList){
            if(this.msgList[i].msgName == name){
                return Number(i);
            }
        }
    }
    encodeProto(data:SocketMsgStruct){
        let protoCode = this.getMsgDecodeProto(data.msgHead);
        return this.getEncodeDecodeFunc(this.msgList[protoCode].packageName,data.msgHead).encode(data.msgData);
    }
    decodeProto(buffer,protoCode){
        let msgHead = this.getMsgDecodeFuncName(protoCode);
        let msgData = this.getEncodeDecodeFunc(this.msgList[protoCode].packageName,msgHead).encode(buffer);
        return {
            msgHead:msgHead,
            msgData:msgData
        }
    }
    decode(buffer):SocketMsgStruct{
        let msgType = buffer[0];
        let msgData = null;
        let msgHead = null;
        if(msgType == MSG_TYPE.HANDSHAKE){
            msgData = JSON.parse(this.strdecode(buffer.slice(1)));
        }else if(msgType == MSG_TYPE.HEARTBEAT){
            msgData = JSON.parse(this.strdecode(buffer.slice(1)));
        }else{
            let msgLen = (buffer[1] << 24) | (buffer[2] << 16) | (buffer[3] << 8) | buffer[4];
            let protoCode = (buffer[5] << 8) | buffer[6]
            let dataMsg = this.decodeProto(buffer.slice(7),protoCode);
            msgHead = dataMsg.msgHead;
            msgData = dataMsg.msgData;
        }
        return {
            msgType:msgType,
            msgHead:msgHead,
            msgData:msgData
        };
    }
    encode(data:SocketMsgStruct){
        let index = 0;
        let msg_len = 0;
        let dataBuf = null;
        let buffer = null;
        if(data.msgType == MSG_TYPE.MSG){
            let protoCode = this.getMsgDecodeProto(data.msgHead);
            dataBuf = this.encodeProto(data);
            msg_len = dataBuf.length+7;
            buffer = new Uint8Array(msg_len);
            buffer[index++] = data.msgType & 0xff;  
            buffer[index++] = msg_len >> 24 & 0xff;
            buffer[index++] = msg_len >> 16 & 0xff;
            buffer[index++] = msg_len >> 8 & 0xff;
            buffer[index++] = msg_len & 0xff;
            buffer[index++] = protoCode >> 8 & 0xff;
            buffer[index++] = protoCode & 0xff;
        }else{
            dataBuf = this.strencode(JSON.stringify(data.msgData))
            msg_len = dataBuf.length + 1;
            buffer = new Uint8Array(msg_len);
            buffer[index++] = data.msgType & 0xff;  
        }
        game.protoMgr.copyArray(buffer, index, dataBuf, 0, dataBuf.length);
        return buffer;
    }
    strencode(str: string) {
        let byteArray: number[] = [];
        for (let c of str) {
            let codePoint = c.codePointAt(0) as number;
            if (codePoint <= 0x7f) {
                byteArray.push(codePoint);
            } else if (codePoint <= 0x7ff) {
                byteArray.push(0xc0 | (codePoint >> 6), 0x80 | (codePoint & 0x3f));
            } else if (codePoint <= 0xffff) {
                byteArray.push(0xe0 | (codePoint >> 12), 0x80 | ((codePoint & 0xfc0) >> 6), 0x80 | (codePoint & 0x3f));
            } else {
                byteArray.push(0xf0 | (codePoint >> 18), 0x80 | ((codePoint & 0x3f000) >> 12), 0x80 | ((codePoint & 0xfc0) >> 6), 0x80 | (codePoint & 0x3f));
            }
        }
        return new Uint8Array(byteArray);
    }
    strdecode(bytes: Uint8Array) {
        let array: number[] = [];
        let offset = 0;
        let codePoint = 0;
        let end = bytes.length;
        while (offset < end) {
            if (bytes[offset] < 128) {
                codePoint = bytes[offset];
                offset += 1;
            } else if (bytes[offset] < 224) {
                codePoint = ((bytes[offset] & 0x3f) << 6) + (bytes[offset + 1] & 0x3f);
                offset += 2;
            } else if (bytes[offset] < 240) {
                codePoint = ((bytes[offset] & 0x0f) << 12) + ((bytes[offset + 1] & 0x3f) << 6) + (bytes[offset + 2] & 0x3f);
                offset += 3;
            } else {
                codePoint = ((bytes[offset] & 0x07) << 18) + ((bytes[offset + 1] & 0x3f) << 12) + ((bytes[offset + 2] & 0x3f) << 6) + (bytes[offset + 3] & 0x3f);
                offset += 4;
            }
            array.push(codePoint);
        }
        return String.fromCodePoint.apply(null, array);
    }
    copyArray(dest: Uint8Array, doffset: number, src: Uint8Array, soffset: number, length: number) {
        for (let index = 0; index < length; index++) {
            dest[doffset++] = src[soffset++];
        }
    }
}