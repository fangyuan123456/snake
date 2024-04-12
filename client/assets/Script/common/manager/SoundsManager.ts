import { SingleBase } from "../base/SingleBase";
import { Dic, e_bundleName } from "../interface/I_Common";
import { e_STROGE_KEY } from "./StorgeManager";

export class SoundManager extends SingleBase {
    musicSwitchMap: { musicSwitch: boolean, effectSwitch } = {
        musicSwitch: true,
        effectSwitch: true
    }
    musicIdMap: Dic<number> = {};
    constructor() {
        super();
        this.bindData();
    }
    bindData() {
        game.storgeMgr.bindStrogeKey({ target: this, key: "musicSwitchMap" }, e_STROGE_KEY.SOUND_STROGE_KEY)
    }
    playBmg(name: string, _isLoop: boolean = false, volume: number = 1,bundleName?:e_bundleName) {
        if (!this.musicSwitchMap.musicSwitch) return
        game.resMgr.loadRes<cc.AudioClip>(name+".mp3",cc.AudioClip,bundleName).then((audioClip:cc.AudioClip)=>{
            this.musicIdMap[name] = cc.audioEngine.play(audioClip, _isLoop, volume);
        })
    }
    playMusic(name, _isLoop: boolean = false, volume: number = 1,bundleName?:e_bundleName) {
        if (!this.musicSwitchMap.effectSwitch) return;
        game.resMgr.loadRes<cc.AudioClip>(name+".mp3",cc.AudioClip,bundleName).then((audioClip:cc.AudioClip)=>{
            this.musicIdMap[name] = cc.audioEngine.play(audioClip, _isLoop, volume);
        })
    }
    stopMusic(name) {
        if (this.musicIdMap[name] || this.musicIdMap[name] == 0) {
            cc.audioEngine.stop(this.musicIdMap[name]);
        }
    }
    switchMusic(_type, _isOn) {
        var _keyArr = ["musicSwitch", "effectSwitch"]
        switch (_keyArr[_type]) {
            case "musicSwitch":
                this.musicSwitchMap.musicSwitch = _isOn;
                if (_isOn) {
                    this.playBmg("gameBgm", true);
                } else {
                    this.stopMusic("gameBgm");
                }
                break;
            case "effectSwitch":
                this.musicSwitchMap.effectSwitch = _isOn;
                break;
        }
    }
}