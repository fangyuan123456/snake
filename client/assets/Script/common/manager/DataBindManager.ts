import { SingleBase } from "../base/SingleBase";
interface I_BindingStruct {
    curData: { target: any, key: string },
    targetData: { target: any, key: string }
}
export class ObservableProxy {
    private obj: { [key: string]: any };
    constructor(obj: { [key: string]: any }) {
        this.obj = obj;
        this.createObservable();
    }
    createObservable(){
        if(!this.obj["observable"]){
            this.obj["observable"] = new Proxy(this.obj, {
                set(target, key, value, receiver) {
                    const result = Reflect.set(target, key, value, receiver)
                    target.observableList.forEach((data)=>{
                        data.cb(data.key)();
                    })
                    return result
                }
            })
        }
    }
    addObserver(key:string,cb: Function){
        if (cb) {
            if(!this.obj.observableList){
                this.obj.observableList = new Set();
            }
            this.obj.observableList.add({key:key,cb:cb})
        }
    }
}
export class DataBindManager extends SingleBase {
    isStartRun: boolean = false
    constructor() {
        super();
    }
    bind(bindData: I_BindingStruct, callBack?: (value?:any) => void) {
        let proxy = new ObservableProxy(bindData.targetData.target);
        proxy.addObserver(bindData.targetData.key, (value: any) => {
            bindData.curData.target[bindData.curData.key] = value;
            if(callBack){
                callBack(value)
            }
        });
    }
}