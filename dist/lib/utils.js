(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.getRandomId = void 0;
    var uuidv4 = require('uuid').v4;
    var getRandomId = function () {
        return uuidv4();
    };
    exports.getRandomId = getRandomId;
});
