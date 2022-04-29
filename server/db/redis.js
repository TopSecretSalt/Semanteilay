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
const redis_om_1 = require("redis-om");
const client = new redis_om_1.Client();
function connect() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!client.isOpen()) {
            console.log("connected to db");
            yield client.open(process.env.REDIS_URL);
        }
    });
}
connect().then(() => console.log("db connected"));
exports.default = client;
