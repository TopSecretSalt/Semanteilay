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
exports.removeTeamFromRoom = exports.addTeamToRoom = exports.getPopulatedRoomById = exports.getRoomById = exports.getAllRooms = exports.createRoom = void 0;
const socket_1 = require("../socket/socket");
const repository = __importStar(require("../repositories/roomRepository"));
const createRoom = (name) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.createRoom(name); });
exports.createRoom = createRoom;
const getAllRooms = () => __awaiter(void 0, void 0, void 0, function* () {
    const rooms = yield repository.getAllRooms();
    return rooms.map((room) => {
        const participantCount = (0, socket_1.getParticipantCount)(room);
        return Object.assign(Object.assign({}, room), { participantCount });
    });
});
exports.getAllRooms = getAllRooms;
const getRoomById = (id) => __awaiter(void 0, void 0, void 0, function* () { return (yield repository.getRoomById(id)).formatted(); });
exports.getRoomById = getRoomById;
const getPopulatedRoomById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const room = yield repository.getRoomById(id);
    const populatedRoom = yield room.populate();
    const participantCount = (0, socket_1.getParticipantCount)(populatedRoom);
    return Object.assign(Object.assign({}, populatedRoom), { participantCount });
});
exports.getPopulatedRoomById = getPopulatedRoomById;
const addTeamToRoom = (roomId, teamId) => __awaiter(void 0, void 0, void 0, function* () {
    const room = yield repository.getRoomById(roomId);
    yield room.addTeam(teamId);
});
exports.addTeamToRoom = addTeamToRoom;
const removeTeamFromRoom = (roomId, teamId) => __awaiter(void 0, void 0, void 0, function* () {
    const room = yield repository.removeTeam(teamId, roomId);
    if (room.isEmpty()) {
        yield room.delete();
    }
});
exports.removeTeamFromRoom = removeTeamFromRoom;
