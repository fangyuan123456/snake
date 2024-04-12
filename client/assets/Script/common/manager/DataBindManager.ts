import { SingleBase } from "../base/SingleBase";
interface I_BindingStruct {
    curData: { target: any, key: string },
    targetData: { target: any, key: string }
}
class CProxy{
    orginTarget:object
    orginData:Object
    constructor(proxyTargetData:{target:Object,key:string},onChangeCallBack:(data:Object)=>void){
        this.orginTarget = proxyTargetData.target;
        this.orginData = proxyTargetData.target[proxyTargetData.key]
        let proxy = null;
        if(!this.orginData["isProxy"]){
            proxy =  this.createRecursiveProxy(this.orginData,(target, prop, value)=>{
                let proxyCallBackList = proxy["proxyCallBackList"];
                if(target !=proxyCallBackList && prop != "isProxy"){
                    for(let i in proxyCallBackList){
                        proxyCallBackList[i](this.orginData)
                    }
                }
            });
            proxy["isProxy"] = true;
            proxy["proxyCallBackList"] = [];
            proxyTargetData.target[proxyTargetData.key] = proxy;
        }else{
            proxy = this.orginData;
        }
        proxy["proxyCallBackList"].push(onChangeCallBack);
    }
    createRecursiveProxy(obj,onChangeCallBack) {
        let that = this;
        // 创建一个代理对象
        let proxy  =  new Proxy(obj, {
            get(target, prop, receiver) {
                const value = Reflect.get(target, prop, receiver);
                if (typeof value === 'object' && value !== null && prop != "proxyCallBackList") {
                    return that.createRecursiveProxy(value,onChangeCallBack);
                }
                return value;
            },
            set(target, prop, value, receiver) {
                const result = Reflect.set(target, prop, value, receiver);
                onChangeCallBack(target, prop, value);
                return result;
            }
        });
        return proxy
    }
}

export class ObservableProxy {
    private obj: { target: any, key: string };
    constructor(obj: { target: any, key: string }) {
        this.obj = obj;
        this.obj.target.originalValueMap = this.obj.target.originalValueMap||{};
        this.createObservable();
    }
    createObservable(){
        let that = this;
        this.obj.target.isInitMap = this.obj.target.isInitMap || {};
        if(!this.obj.target.isInitMap[this.obj.key]){
            this.obj.target.isInitMap[this.obj.key] = true;
            this.obj.target.originalValueMap[this.obj.key] = this.obj.target[this.obj.key];
            Object.defineProperty(this.obj.target, this.obj.key, {
                set(newValue) {
                    that.obj.target.originalValueMap[that.obj.key] = newValue;
                    that.createRecursiveProxy({target:that.obj.target.originalValueMap,key:that.obj.key})
                    that.callObServerFunc(newValue);
                },
                get(){
                    return that.obj.target.originalValueMap[that.obj.key]
                },
                enumerable: true,
                configurable: true
            });
            this.createRecursiveProxy({target:this.obj.target.originalValueMap,key:this.obj.key})
        }
    }
    createRecursiveProxy(obj: { target: any, key: string }){
        new CProxy(obj,(value)=>{
            this.callObServerFunc(value);
        });
    }
    getRegisterList(){
        let target = this.obj.target;
        target.observableRegisterMap = target.observableRegisterMap || {}
        target.observableRegisterMap[this.obj.key] = target.observableRegisterMap[this.obj.key] || []
        let observableRegisterList =  this.obj.target.observableRegisterMap[this.obj.key];
        return observableRegisterList;
    }
    addObserver(cb: Function){
        if (cb) {
            this.getRegisterList().push(cb)
        }
    }
    callObServerFunc(value){
        let observableRegisterList =  this.getRegisterList()
        observableRegisterList.forEach((cb)=>{
            cb(value);
        })
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