(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./messages", "./rooms", "./users"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.memory_db_src = void 0;
    var messages_1 = require("./messages");
    var rooms_1 = require("./rooms");
    var users_1 = require("./users");
    exports.memory_db_src = {
        users: new users_1.Users(),
        rooms: new rooms_1.Rooms(),
        messages: new messages_1.Messages()
    };
});
