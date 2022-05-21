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
exports.initialize = exports.deleteUser = exports.fetchUsers = exports.createUser = exports.getAllUsers = exports.isNameTaken = exports.getUserById = void 0;
const redis_om_1 = require("redis-om");
const redis_1 = __importDefault(require("../db/redis"));
class User extends redis_om_1.Entity {
    static formatted(user) {
        return {
            name: user.name,
            id: user.entityId,
        };
    }
}
const schema = new redis_om_1.Schema(User, {
    name: { type: "string" },
});
const userRepository = redis_1.default.fetchRepository(schema);
const getUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () { return yield userRepository.fetch(userId); });
exports.getUserById = getUserById;
const isNameTaken = (userName) => __awaiter(void 0, void 0, void 0, function* () { return (yield userRepository.search().where("name").equals(userName).return.count()) !== 0; });
exports.isNameTaken = isNameTaken;
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () { return yield userRepository.search().all(); });
exports.getAllUsers = getAllUsers;
const createUser = (userName) => __awaiter(void 0, void 0, void 0, function* () { return yield userRepository.createAndSave({ name: userName }); });
exports.createUser = createUser;
const fetchUsers = (userIds) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield Promise.all(userIds.map((userId) => userRepository.fetch(userId)));
    return users.map(User.formatted);
});
exports.fetchUsers = fetchUsers;
const deleteUser = (userId) => __awaiter(void 0, void 0, void 0, function* () { return yield userRepository.remove(userId); });
exports.deleteUser = deleteUser;
const initialize = () => __awaiter(void 0, void 0, void 0, function* () {
    yield userRepository.createIndex();
    console.log("user index built");
});
exports.initialize = initialize;
(0, exports.initialize)();
