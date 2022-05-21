"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.leaveRoom = exports.getUserById = exports.getAllUsers = exports.signUp = void 0;
const socket_1 = require("../socket/socket");
const repository = __importStar(require("../repositories/userRepository"));
const roomService_1 = require("./roomService");
const teamService_1 = require("./teamService");
const signUp = (name, socketId) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield repository.isNameTaken(name)) {
        throw new Error("nickname taken");
    }
    const { entityId: id } = yield repository.createUser(name);
    yield (0, socket_1.hookSocketWithUser)(id, socketId);
    return id;
});
exports.signUp = signUp;
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getAllUsers(); });
exports.getAllUsers = getAllUsers;
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getUserById(id); });
exports.getUserById = getUserById;
const leaveRoom = (userId, roomId) => __awaiter(void 0, void 0, void 0, function* () {
    const room = yield (0, roomService_1.getRoomById)(roomId);
    room.teams.forEach((team) => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, teamService_1.leaveTeam)(userId, team, roomId);
    }));
});
exports.leaveRoom = leaveRoom;
const deleteUser = (userId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.deleteUser(userId); });
exports.deleteUser = deleteUser;
