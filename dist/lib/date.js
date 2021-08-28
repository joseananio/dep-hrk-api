(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "date-fns"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.getDateDiff = void 0;
    var date_fns_1 = require("date-fns");
    var getDateDiff = function (_date) {
        var mnths = date_fns_1.differenceInMonths(new Date(), new Date(_date));
        var days = date_fns_1.differenceInDays(new Date(), new Date(_date));
        var hours = date_fns_1.differenceInHours(new Date(), new Date(_date));
        var mins = date_fns_1.differenceInMinutes(new Date(), new Date(_date));
        var secs = date_fns_1.differenceInSeconds(new Date(), new Date(_date));
        return days === NaN
            ? { val: 0, unit: 'secs' }
            : days > 30
                ? { val: mnths, unit: 'mnths' }
                : days > 0
                    ? { val: days, unit: 'days' }
                    : hours > 0
                        ? { val: hours, unit: 'hours' }
                        : mins > 0
                            ? { val: mins, unit: 'mins' }
                            : { val: secs, unit: 'secs' };
    };
    exports.getDateDiff = getDateDiff;
});
