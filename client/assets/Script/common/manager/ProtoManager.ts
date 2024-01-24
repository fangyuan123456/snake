import { json } from "express";
import { SingleBase } from "../base/SingleBase";
import { MSG_TYPE } from "../base/SocketBase";
import { SocketMsgStruct } from "./NetManager";
import * as pbjs from "protobufjs"
export class ProtoManager extends SingleBase{
    protoRoot:{[key:string]:pbjs.Root}  = {};
    decodeFuncMap:{[key:string]:{[key:string]:pbjs.Type}}  = {};
    msgList = []
    constructor(){
        super();
        this.msgList = [];
        this.loadAllProto();
    }
    loadAllProto(){
        let packageList = ["center","info","match","game"];
        for(let i in packageList){
            cc.resources.load("proto/"+packageList[i], (err,jsonAsset:cc.JsonAsset)=> {
                const root = pbjs.Root.fromJSON(jsonAsset.json);
                this.protoRoot[packageList[i]] = root;
           })
        }
    }
    getEncodeDecodeFunc(pkName:string,pbName:string){ 
        this.decodeFuncMap[pkName] = this.decodeFuncMap[pkName] || {};
        if(!this.decodeFuncMap[pkName][pbName]){
            let root = this.protoRoot[pkName];
            this.decodeFuncMap[pkName][pbName] = root.lookupType(pkName+"."+pbName);
        }
        return this.decodeFuncMap[pkName][pbName]
      }
    setMsgCodeList(routeStrList:string[]){
        for(let i in routeStrList){
            let strList = routeStrList[i].split(".");
            let packageName = strList[0];
            let msgName = strList[strList.length-1];
            this.msgList[i] = {
                packageName:packageName,
                msgName:msgName
            };
        }
    }
    getMsgDecodeFuncName(protoCode){
        let obj = this.msgList[protoCode];
        return obj.msgName;
    }
    getMsgDecodeProto(msgName){
        for(let i in this.msgList){
            if(this.msgList[i].msgName == msgName){
                return Number(i);
            }
        }
    }
    encodeProto(data:SocketMsgStruct){
        let protoCode = this.getMsgDecodeProto(data.msgHead);
        if(!this.msgList[protoCode]){
            game.logMgr.error(JSON.stringify(data))
            return
        }
        let typeFunc = this.getEncodeDecodeFunc(this.msgList[protoCode].packageName,data.msgHead+"Req");
        let message = typeFunc.create(data.msgData);
        return typeFunc.encode(message).finish();
    }
    decodeProto(buffer,protoCode){
        let msgHead = this.getMsgDecodeFuncName(protoCode);
        let typeFunc = this.getEncodeDecodeFunc(this.msgList[protoCode].packageName,msgHead+"Res");
        let msgData = null;
        try{
            msgData = typeFunc.decode(buffer);
        }catch(err){
            debugger;
            msgData = typeFunc.decode(buffer);
            return;
        }
        return {
            msgHead:msgHead,
            msgData:msgData
        }
    }
    decode(buffer:Uint8Array):SocketMsgStruct{
        let msgData = null;
        let msgHead = null;
        let index = 0;
        let msgLen = (buffer[index++] << 24) | (buffer[index++] << 16) | (buffer[index++] << 8) | buffer[index++];
        let msgType = buffer[index++];
        if(msgType == MSG_TYPE.HANDSHAKE){
            msgData = JSON.parse(this.strdecode(buffer.slice(index)));
        }else if(msgType == MSG_TYPE.HEARTBEAT){
        }else{
            let protoCode = (buffer[index++] << 8) | buffer[index++]
            let dataMsg = this.decodeProto(buffer.slice(index),protoCode);
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
        data.msgType = data.msgType || MSG_TYPE.MSG;
        let index = 0;
        let msg_len = 0;
        let dataBuf = null;
        let buffer = null;
        if(data.msgType == MSG_TYPE.MSG){
            let protoCode = this.getMsgDecodeProto(data.msgHead);
            dataBuf = this.encodeProto(data);
            msg_len = dataBuf.length+7;
            buffer = new Uint8Array(msg_len);
            buffer[index++] = msg_len >> 24 & 0xff;
            buffer[index++] = msg_len >> 16 & 0xff;
            buffer[index++] = msg_len >> 8 & 0xff;
            buffer[index++] = msg_len & 0xff;
            buffer[index++] = data.msgType & 0xff;  
            buffer[index++] = protoCode >> 8 & 0xff;
            buffer[index++] = protoCode & 0xff;
        }else{
            dataBuf = this.strencode(JSON.stringify(data.msgData))
            msg_len = dataBuf.length + 1;
            buffer = new Uint8Array(dataBuf.length + 5);
            buffer[index++] = msg_len >> 24 & 0xff;
            buffer[index++] = msg_len >> 16 & 0xff;
            buffer[index++] = msg_len >> 8 & 0xff;
            buffer[index++] = msg_len & 0xff;
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