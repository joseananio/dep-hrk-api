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
    exports.Rooms = void 0;
    var Rooms = /** @class */ (function () {
        function Rooms() {
            this._rooms = [];
        }
        // getByName(_name) {
        //   return this._rooms.find(({ name }) => name === _name);
        // }
        Rooms.prototype.get = function (_id) {
            return this._rooms.find(function (_a) {
                var id = _a.id;
                return id === _id;
            });
        };
        Rooms.prototype.add = function (room) {
            room.createdAt = new Date().toISOString();
            if (!this.get(room.name)) {
                this._rooms = __spreadArray([room], this._rooms);
            }
        };
        Rooms.prototype.remove = function (room) {
            this._rooms = this._rooms.filter(function (_room) { return _room.name !== room.name; });
        };
        // TODO: private rooms
        Rooms.prototype.getAll = function (user) {
            return this._rooms; //.filter((room) => room.participants.includes(user));
        };
        return Rooms;
    }());
    exports.Rooms = Rooms;
});
