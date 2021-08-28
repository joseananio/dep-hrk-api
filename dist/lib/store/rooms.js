"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rooms = void 0;
class Rooms {
    constructor() {
        this._rooms = [];
    }
    // getByName(_name) {
    //   return this._rooms.find(({ name }) => name === _name);
    // }
    get(_id) {
        return this._rooms.find(({ id }) => id === _id);
    }
    add(room) {
        room.createdAt = new Date().toISOString();
        if (!this.get(room.name)) {
            this._rooms = [room, ...this._rooms];
        }
    }
    remove(room) {
        this._rooms = this._rooms.filter((_room) => _room.name !== room.name);
    }
    // TODO: private rooms
    getAll(user) {
        return this._rooms; //.filter((room) => room.participants.includes(user));
    }
}
exports.Rooms = Rooms;
