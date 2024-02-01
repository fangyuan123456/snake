import { I_loginReq } from "../../common/interface/I_Login";
import { I_updSocket, I_webSocket, PlatformBase } from "../PlatformBase";

export class WebPlatfromManager extends PlatformBase{
    platformName = "wx"
    isSupportUdp = true
    loadOrderCfg = [
        {
            funcName:"loadRes",
            progressNum:20,
            time:0.3,
            title:"加载资源中..."
        },
        {
            funcName:"login",
            progressNum:100,
            time:1,
            title:"登录中..."
        },
        {
            funcName:"changeScene",
            progressNum:10,
            time:0.5,
            title:"场景准备中..."
        }
    ]
    getLoginCode(callBack:(data:I_loginReq)=>void){
        let inviteUid = this.getWebParm("inviteUid")
        let _data={
            isCeShi:true,
            platform:this.platformName,
            code:this.getWebParm("code"),
            inviteUid:inviteUid?Number(inviteUid):null
        };
        callBack(_data)
    }
    getWebParm(key){
        let getWebParmFunc = (name)=> {
            let r = null;
            if(window && window.location){
                let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                r = window.location.search.substr(1).match(reg);
            }
            if (r != null) return unescape(r[2]); return null;
        };
        return getWebParmFunc(key)
    }
    createWebSocket(ip:string):I_webSocket{
        let webSocket = wx.connectSocket({
            url: ip,
            header:{ 
              'content-type': 'application/json'
            },
            protocols: ['protocol1']
        });
        let socketTarget:I_webSocket = {
            send:(buffer)=>{
                webSocket.send({data:buffer})
            },
            close:()=>{
                webSocket.close({});
            },
            onopen:()=>{},
            onmessage:()=>{},
            onerror:()=>{},
            onclose:()=>{}
        }
        webSocket.onOpen(()=>{
            socketTarget.onopen();
        });
        webSocket.onMessage((msg)=>{
            socketTarget.onmessage(msg.data as ArrayBuffer);
        });
        webSocket.onClose(()=>{
            socketTarget.onclose();
        });
        webSocket.onError(()=>{
            socketTarget.onerror();
        });
        return socketTarget;
    }
    sendHttpRequest(data:any,callBack:(callDataStr:any)=>void,failCallBack:()=>void){
        let sendData = {
            msgHead:data.msgHead,
            msgData:data.msgData
        }
        wx.request({
            url:data.url,
            data:sendData,
            header:{
                "Content-Type": "text/plain;charset=utf-8" 
            },
            method: "POST",
            success:function(res){
                if(callBack)callBack(res.data);
            },
            fail:function(err){
                if(failCallBack)failCallBack()
            }
        })
    }
    createUdpSocket(ip:string):I_updSocket{
        let ipArr = ip.split(":");
        let address = ipArr[0];
        let port = Number(ipArr[1]);
        let udpSocket = wx.createUDPSocket();
        udpSocket.bind();
        let socketTarget:I_updSocket = {
            send:(buffer)=>{
                udpSocket.send({
                    address:address,
                    port:port,
                    message:buffer
                })
            },
            close:udpSocket.close,
            onmessage:()=>{},
        }
        udpSocket.onMessage((msg)=>{
            socketTarget.onmessage(msg.message);
        })
        return socketTarget;
    }
}