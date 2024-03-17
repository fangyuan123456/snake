"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SingleBase = void 0;
class SingleBase {
    /**
     * 获取实例
     */
    static getInstance() {
        const _class = this;
        if (!_class._instance) {
            _class._instantiateByGetInstance = true;
            _class._instance = new _class();
            _class._instantiateByGetInstance = false;
        }
        return _class._instance;
    }
    /**
     * 构造函数
     * @protected
     */
    constructor() {
        if (!this.constructor._instantiateByGetInstance) {
            throw new Error("SingleBase class can't be instantiated more than once.");
        }
    }
}
exports.SingleBase = SingleBase;
// 是否是通过getInstance实例化
SingleBase._instantiateByGetInstance = false;
