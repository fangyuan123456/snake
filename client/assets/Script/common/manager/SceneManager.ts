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
            cc.director.preloadScene(sceneName,null,()=>{
                cc.director.loadScene(sceneName);
            })
            cc.director.loadScene("TransformScene");
        }else{
            cc.director.loadScene(sceneName);
        }
    }
}