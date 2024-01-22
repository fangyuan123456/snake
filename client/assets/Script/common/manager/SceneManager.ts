import { SceneBase } from "../base/SceneBase";
import { SingleBase } from "../base/SingleBase";

export class SceneManager extends SingleBase{
    currentScene:SceneBase
    setCurrentScene(scene:SceneBase){
        this.currentScene = scene;
    }
    getCurrentScene(){
        return this.currentScene
    }
    changeScene(sceneName,isPreLoad?:boolean){
        if(isPreLoad){
            cc.director.loadScene("TransformScene",()=>{
                cc.director.loadScene(sceneName);
            });
        }else{
            cc.director.loadScene(sceneName);
        }
    }
}