"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventManager = void 0;
const SingleBase_1 = require("../base/SingleBase");
class EventManager extends SingleBase_1.SingleBase {
    constructor() {
        super(...arguments);
        this.eventMap = {};
    }
    on(eventName, callBack, target) {
        if (!this.getEventData(eventName, callBack)) {
            this.eventMap[eventName] = this.eventMap[eventName] || [];
            this.eventMap[eventName].push({
                target: target,
                callBack: callBack
            });
        }
    }
    once(eventName, callBack, target) {
        if (!this.getEventData(eventName, callBack)) {
            this.eventMap[eventName] = this.eventMap[eventName] || [];
            this.eventMap[eventName].push({
                target: target,
                callBack: callBack,
                isOnce: true
            });
        }
    }
    dispatch(eventName, data) {
        let eventList = this.eventMap[eventName] || [];
        for (let i in eventList) {
            eventList[i].callBack(data);
        }
        for (let i = eventList.length - 1; i >= 0; i--) {
            if (eventList[i].isOnce) {
                eventList.splice(i);
            }
        }
    }
    remove(eventName, callBack) {
        let eventData = this.getEventData(eventName, callBack);
        if (eventData) {
            let index = this.eventMap[eventName].indexOf(eventData);
            this.eventMap[eventName].splice(index);
        }
    }
    removeAll(target) {
        for (let i in this.eventMap) {
            for (let j = this.eventMap[i].length - 1; j >= 0; j--) {
                let eventData = this.eventMap[i][j];
                if (eventData.target == target) {
                    this.eventMap[i].splice(j);
                }
            }
        }
    }
    getEventData(eventName, callBack) {
        this.eventMap[eventName] = this.eventMap[eventName] || [];
        for (let i in this.eventMap[eventName]) {
            let eventData = this.eventMap[eventName][i];
            if (eventData.callBack == callBack) {
                return eventData;
            }
        }
    }
}
exports.EventManager = EventManager;
