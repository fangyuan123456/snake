import { SingleBase } from "../base/SingleBase";
interface I_BindingStruct {
    curData: { target: any, key: string },
    targetData: { target: any, key: string }
}
export class ObservableProxy {
    private obj: { target: any, key: string };
    constructor(obj: { target: any, key: string }) {
        this.obj = obj;
        this.createObservable();
    }
    createObservable(){
        let observableMap = this.obj.target.observableMap || {};
        if(!observableMap[this.obj.key]){
            observableMap[this.obj.key] = true;
            let target = this.obj.target;
            target.observableRegisterMap = target.observableRegisterMap || {}
            target.observableRegisterMap[this.obj.key] = target.observableRegisterMap[this.obj.key] || []
            let observableRegisterList =  target.observableRegisterMap[this.obj.key];
            let originalValue = this.obj.target[this.obj.key];
            Object.defineProperty(this.obj.target, this.obj.key, {
                set(newValue) {
                    originalValue = newValue;
                    observableRegisterList.forEach((cb)=>{
                        cb(newValue);
                    })
                },
                get(){
                    return originalValue
                },
                enumerable: true,
                configurable: true
            });
        }
    }
    addObserver(cb: Function){
        if (cb) {
            let observableRegisterList = this.obj.target.observableRegisterMap[this.obj.key]
            observableRegisterList.push(cb)
        }
    }
}
export class DataBindManager extends SingleBase {
    isStartRun: boolean = false
    constructor() {
        super();
    }
    bind(bindData: I_BindingStruct, callBack?: (value?:any) => void) {
        let proxy = new ObservableProxy(bindData.targetData);
        proxy.addObserver((value: any) => {
            bindData.curData.target[bindData.curData.key] = value;
            if(callBack){
                callBack(value)
            }
        });
    }
}