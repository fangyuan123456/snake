import { CompBase } from "../common/base/CompBase";
import SnakeBase from "./base/SnakeBase";

export class MySnakeControl extends CompBase{
    mySnake:SnakeBase
    start () {
        super.start();
        this.mySnake = this.node.getComponent(SnakeBase);
        game.roomData.mySnake = this.mySnake;
        this.onEvent("predictNextFrame",this.predictNextFrame.bind(this));
        this.onEvent("useSnapshot",this.useSnapshot.bind(this));
    }
    predictNextFrame(frameId){
        this.mySnake.updateTransfrom(1,game.roomData.getPredictUserInput(frameId));
    }
    useSnapshot(){
        this.mySnake.useSnapshot();
    }
}