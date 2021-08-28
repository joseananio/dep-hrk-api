var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@7speck/logger", "socket.io", "./lib/store.mongo/client", "./lib/store.mongo/index", "./lib/utils"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.initializeSocket = void 0;
    var logger_1 = require("@7speck/logger");
    var socket_io_1 = require("socket.io");
    var client_1 = require("./lib/store.mongo/client");
    var index_1 = require("./lib/store.mongo/index");
    var utils_1 = require("./lib/utils");
    var getUserId = function (socket) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, socket.id];
        });
    }); };
    var initializeSocket = function (server) {
        var users = index_1.mongo_db_src.users, rooms = index_1.mongo_db_src.rooms, messages = index_1.mongo_db_src.messages;
        var io = new socket_io_1.Server(server, {
            cors: {
                origin: '*',
                methods: ['GET', 'POST']
            }
        });
        io.on('connection', function (socket) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                socket.on('disconnect', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var _users;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                logger_1.logger.warn('disconnected: ', socket.user);
                                // TODO
                                return [4 /*yield*/, users.remove(socket.user)];
                            case 1:
                                // TODO
                                _a.sent();
                                return [4 /*yield*/, users.getAll()];
                            case 2:
                                _users = _a.sent();
                                socket.emit('showRooms', rooms);
                                socket.broadcast.emit('showUsers', _users);
                                return [2 /*return*/];
                        }
                    });
                }); });
                // user joins socket
                // return the rooms available to the user
                socket.on('register', function (user) { return __awaiter(void 0, void 0, void 0, function () {
                    var _rooms, _users;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!(user.name && user.identifier)) return [3 /*break*/, 4];
                                socket.user = user;
                                return [4 /*yield*/, users.add(socket.user)];
                            case 1:
                                _a.sent();
                                return [4 /*yield*/, rooms.getAll(user.identifier)];
                            case 2:
                                _rooms = _a.sent();
                                return [4 /*yield*/, users.getAll()];
                            case 3:
                                _users = _a.sent();
                                socket.emit('showRooms', _rooms);
                                socket.emit('showUsers', _users);
                                socket.broadcast.emit('showUsers', _users);
                                logger_1.logger.info("\\registered\\" + user.identifier + ": " + user.name + " ");
                                _a.label = 4;
                            case 4: return [2 /*return*/];
                        }
                    });
                }); });
                // user requests for rooms??
                socket.on('getRooms', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var _rooms;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, rooms.getAll(socket.user.identifier)];
                            case 1:
                                _rooms = _a.sent();
                                logger_1.logger.info("INFO: \\getRooms\\" + socket.user.identifier + " -> [showRooms] " + _rooms.length);
                                socket.emit('showRooms', _rooms);
                                return [2 /*return*/];
                        }
                    });
                }); });
                // join or rejoin room
                socket.on('createRoom', function (room) { return __awaiter(void 0, void 0, void 0, function () {
                    var _rooms;
                    var _a, _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                room.id = room.id || utils_1.getRandomId();
                                return [4 /*yield*/, rooms.add(room)];
                            case 1:
                                _c.sent();
                                socket.join(room.id);
                                socket.emit('newRoomUpdate', room);
                                return [4 /*yield*/, rooms.getAll((_a = socket.user) === null || _a === void 0 ? void 0 : _a.identifier)];
                            case 2:
                                _rooms = _c.sent();
                                if (room.private) {
                                    io.to(room.id).emit('showRooms', _rooms);
                                }
                                else {
                                    io.emit('showRooms', _rooms);
                                }
                                io.to(room.id).emit('notice', ((_b = socket.user) === null || _b === void 0 ? void 0 : _b.name) + ' created room ' + room.name);
                                return [2 /*return*/];
                        }
                    });
                }); });
                socket.on('joinRoom', function (room) { return __awaiter(void 0, void 0, void 0, function () {
                    var _messages;
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                socket.leave(room.id);
                                socket.join(room.id);
                                io.to(room.id).emit('notice', ((_a = socket.user) === null || _a === void 0 ? void 0 : _a.name) + ' joined ' + room.name);
                                return [4 /*yield*/, messages.getAll(room.id)];
                            case 1:
                                _messages = _b.sent();
                                socket.emit('previousMessages', _messages);
                                return [2 /*return*/];
                        }
                    });
                }); });
                socket.on('message', function (message) { return __awaiter(void 0, void 0, void 0, function () {
                    var room, _message;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!(message === null || message === void 0 ? void 0 : message.message)) return [3 /*break*/, 4];
                                return [4 /*yield*/, rooms.get(message.room)];
                            case 1:
                                room = _a.sent();
                                if (!room) return [3 /*break*/, 3];
                                _message = __assign(__assign({}, message), { id: utils_1.getRandomId() });
                                return [4 /*yield*/, messages.add(_message)];
                            case 2:
                                _a.sent();
                                io.to(room.id).emit('message', _message);
                                logger_1.logger.imp('msg: ' + _message.id);
                                return [3 /*break*/, 4];
                            case 3:
                                socket.emit('message failed', {
                                    room: message.room,
                                    error: 'room not found'
                                });
                                _a.label = 4;
                            case 4: return [2 /*return*/];
                        }
                    });
                }); });
                socket.on('reset', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var db, error_1, error_2;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 9, , 10]);
                                logger_1.logger.info('Reseting System');
                                return [4 /*yield*/, client_1.connectToDatabase()];
                            case 1:
                                db = (_a.sent()).db;
                                _a.label = 2;
                            case 2:
                                _a.trys.push([2, 4, , 5]);
                                return [4 /*yield*/, db.createCollection('dummy')];
                            case 3:
                                _a.sent();
                                return [3 /*break*/, 5];
                            case 4:
                                error_1 = _a.sent();
                                return [3 /*break*/, 5];
                            case 5: 
                            // drop all usefull collections
                            return [4 /*yield*/, db.collection('users').drop()];
                            case 6:
                                // drop all usefull collections
                                _a.sent();
                                return [4 /*yield*/, db.collection('rooms').drop()];
                            case 7:
                                _a.sent();
                                return [4 /*yield*/, db.collection('members').drop()];
                            case 8:
                                _a.sent();
                                logger_1.logger.info('Reset DONE');
                                return [3 /*break*/, 10];
                            case 9:
                                error_2 = _a.sent();
                                console.error(error_2);
                                logger_1.logger.warn('Reset possibly failed');
                                return [3 /*break*/, 10];
                            case 10: return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        }); });
        logger_1.logger.info('socket started');
    };
    exports.initializeSocket = initializeSocket;
});
