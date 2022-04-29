"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = void 0;
const redis_om_1 = require("redis-om");
const redis_1 = __importDefault(require("../redis"));
class User extends redis_om_1.Entity {
}
const schema = new redis_om_1.Schema(User, {
    name: { type: 'string' }
});
exports.userRepository = redis_1.default.fetchRepository(schema);
