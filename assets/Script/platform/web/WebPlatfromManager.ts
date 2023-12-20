import { PlatformBase } from "../PlatformBase";

export class WebPlatfromManager extends PlatformBase{
    loadOrderCfg = [
        {
            funcName:"loadRes",
            progressNum:20,
            time:0.3,
            title:"加载资源中..."
        },
        {
            funcName:"changeScene",
            progressNum:50,
            time:0.5,
            title:"场景准备中..."
        }
    ]

}