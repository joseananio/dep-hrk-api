var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
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
    exports.Messages = void 0;
    var Messages = /** @class */ (function () {
        function Messages() {
            this._messages = [];
        }
        Messages.prototype.get = function (_id) {
            return this._messages.find(function (_a) {
                var id = _a.id;
                return id === _id;
            });
        };
        Messages.prototype.add = function (message) {
            message.createdAt = new Date().toISOString();
            if (!this.get(message.id)) {
                this._messages = __spreadArray([message], this._messages);
            }
        };
        Messages.prototype.remove = function (message) {
            this._messages = this._messages.filter(function (_message) { return _message.id !== message.id; });
        };
        Messages.prototype.getAll = function (room) {
            return this._messages.filter(function (message) { return message.room === room.id; });
        };
        return Messages;
    }());
    exports.Messages = Messages;
});
