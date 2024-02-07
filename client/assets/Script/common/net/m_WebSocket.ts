import { SocketBase } from "./SocketBase"

export class m_WebSocket extends SocketBase{
    createSocket(){
        return  game.platFormMgr.createWebSocket("ws://"+this.ip);
    }
    registerCallBack(){
        this.socket.onopen = this.onOpen.bind(this);
        this.socket.onmessage = this.onMessage.bind(this);
        this.socket.onerror = this.onError.bind(this);
        this.socket.onclose = this.onClose.bind(this);
    }
}