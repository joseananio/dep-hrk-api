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
    exports.Users = void 0;
    var Users = /** @class */ (function () {
        function Users() {
            this._users = [];
        }
        Users.prototype.get = function (_identifier) {
            return this._users.find(function (_a) {
                var identifier = _a.identifier;
                return identifier === _identifier;
            });
        };
        Users.prototype.add = function (user) {
            if (!this.get(user.identifier)) {
                this._users = __spreadArray([user], this._users);
            }
        };
        Users.prototype.remove = function (user) {
            if (user === null || user === void 0 ? void 0 : user.identifier) {
                this._users = this._users.filter(function (_user) { return _user.identifier !== user.identifier; });
            }
        };
        Users.prototype.getAll = function () {
            return this._users;
        };
        return Users;
    }());
    exports.Users = Users;
});
