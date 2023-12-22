export class SingleBase {
    // 实例
    private static _instance: SingleBase;
    // 是否是通过getInstance实例化
    private static _instantiateByGetInstance: boolean = false;
    
    /**
     * 获取实例
     */
    public static getInstance<T extends SingleBase>(this: (new () => T) | typeof SingleBase): T {
        const _class = this as typeof SingleBase;
        if (!_class._instance) {
            _class._instantiateByGetInstance = true;
            _class._instance = new _class();
            _class._instantiateByGetInstance = false;
        }
        return _class._instance as T;
    }
    
    /**
     * 构造函数
     * @protected
     */
    protected constructor() {
        if (!(this.constructor as typeof SingleBase)._instantiateByGetInstance) {
            throw new Error("SingleBase class can't be instantiated more than once.");
        }
    }
}