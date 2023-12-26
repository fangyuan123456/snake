"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeManager = void 0;
const SingleBase_1 = require("../base/SingleBase");
class TimeManager extends SingleBase_1.SingleBase {
    schedule(callBack, time) {
        return setInterval(callBack, time * 1000);
    }
    unSchedule(id) {
        clearInterval(id);
    }
    scheduleOnce(callBack, time) {
        return setTimeout(callBack, time * 1000);
    }
    unScheduleOnce(id) {
        clearInterval(id);
    }
}
exports.TimeManager = TimeManager;
