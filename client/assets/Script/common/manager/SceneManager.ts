import { SceneBase } from "../base/SceneBase";
import { SingleBase } from "../base/SingleBase";

export class SceneManager extends SingleBase{
    currentScene:SceneBase
    setCurrentScene(scene:SceneBase){
        this.currentScene = scene;
    }
}