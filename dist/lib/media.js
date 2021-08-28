// sizechart
// /100 -> square
// /100/100 -> square
// /100/120 -> rectangle
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
    exports.getRandomPhotoUrl = void 0;
    var getRandomPhotoUrl = function (size) {
        if (size === void 0) { size = '100'; }
        var randomSeed = Math.random().toString().substr(3, 5);
        return "https://picsum.photos/seed/" + randomSeed + "/" + size;
    };
    exports.getRandomPhotoUrl = getRandomPhotoUrl;
});
