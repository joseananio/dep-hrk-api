"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const client_1 = require("./client");
class Users {
    conn() {
        return __awaiter(this, void 0, void 0, function* () {
            const { db } = yield client_1.connectToDatabase();
            return db.collection('users');
        });
    }
    get(identifier) {
        return __awaiter(this, void 0, void 0, function* () {
            const collection = yield this.conn();
            return collection.findOne({ identifier });
        });
    }
    add(user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield this.get(user.identifier))) {
                const collection = yield this.conn();
                yield collection.insertOne(user);
            }
        });
    }
    remove(user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (user === null || user === void 0 ? void 0 : user.identifier) {
                const collection = yield this.conn();
                yield collection.deleteOne({ identifier: user.identifier });
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const collection = yield this.conn();
            return yield collection.find({}).toArray();
        });
    }
}
exports.Users = Users;
