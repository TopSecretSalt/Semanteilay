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
require("dotenv/config");
const redis_om_1 = require("redis-om");
const roomRepository_1 = require("../repositories/roomRepository");
const client = new redis_om_1.Client();
class Room extends redis_om_1.Entity {
}
const schema = new redis_om_1.Schema(Room, {
    name: { type: 'string' },
    teams: { type: 'string[]' },
});
function connect() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!client.isOpen()) {
            console.log("connected to db");
            yield client.open(process.env.REDIS_URL);
        }
    });
}
function build() {
    return __awaiter(this, void 0, void 0, function* () {
        // connect();
        // await client.fetchRepository(schema).createIndex();
        // console.log('built index');
        yield (0, roomRepository_1.initialize)();
        console.log("success!");
    });
}
build();
