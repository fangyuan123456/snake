import { Application } from "mydog";
import { GameServerBase } from "../../common/base/GameServerBase";
import { MatchConfig } from "./src/MatchConfig";
import { serverType } from "../../common/config/GameCfg";
declare global{
    namespace globalThis{
        var matchGame:MatchServer
    }
}
export class MatchServer extends GameServerBase{
    matchList:number[] = [];
    roomIdIndex = 10000;
    constructor(app:Application){
        super(app);
        globalThis.matchGame = this;
    }
    match(data:{uid:number,isMatch:boolean}){
        let index = this.matchList.indexOf(data.uid);
        if(data.isMatch){
            if(index<0){
                this.matchList.push(index);
            }
        }else{
            if(index>=0){
                this.matchList.splice(index,1);
            }
        }
        this.checkMatchOkAndOpenRoom();
    }
    checkMatchOkAndOpenRoom(){
        let openRoomFunc = (matchUidList:number[])=>{
            let roomId = this.roomIdIndex++;
            let gameServer = game.app.getServerById(game.utilsMgr.getSid(roomId,serverType.game));
            let roomIp = game.utilsMgr.getServerIp(gameServer)
            for(let i in matchUidList){
                let uid = matchUidList[i];
                game.app.rpc(game.utilsMgr.getSid(uid,serverType.info)).info.main.setRoomInfo({uid:uid,roomId:roomId,roomIp:roomIp});

                game.sendMsg(uid,{msgHead:"matchOk",msgData:{roomId:roomId,roomIp:roomIp}})
            }
            game.app.rpc(gameServer.id).game.main.createRoom({roomId:roomId,uidList:matchUidList});
        }
        let num = MatchConfig.roomGameNum;
        while(this.matchList.length>=num){
            let matchUidList = [];
            for(let i = num-1;i>=0;i--){
                let uid = this.matchList[i];
                this.matchList.splice(i,1);
                matchUidList.push(uid);
            }
            openRoomFunc(matchUidList);
        }
    }
}