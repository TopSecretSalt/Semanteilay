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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialize = exports.fetchUsers = exports.userRepository = void 0;
const redis_om_1 = require("redis-om");
const redis_1 = __importDefault(require("../db/redis"));
class User extends redis_om_1.Entity {
    static formatted(team) {
        return {
            name: team.name,
            id: team.entityId,
        };
    }
}
const schema = new redis_om_1.Schema(User, {
    name: { type: "string" },
});
exports.userRepository = redis_1.default.fetchRepository(schema);
const fetchUsers = (userIds) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield Promise.all(userIds.map((userId) => exports.userRepository.fetch(userId)));
    return users.map(User.formatted);
});
exports.fetchUsers = fetchUsers;
const initialize = () => __awaiter(void 0, void 0, void 0, function* () {
    yield exports.userRepository.createIndex();
    console.log("user index built");
});
exports.initialize = initialize;
(0, exports.initialize)();
