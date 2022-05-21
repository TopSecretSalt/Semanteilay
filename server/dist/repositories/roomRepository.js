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
exports.initialize = exports.removeTeam = exports.getRoomById = exports.createRoom = exports.populate = exports.getAllRooms = exports.roomRepository = void 0;
const redis_om_1 = require("redis-om");
const redis_1 = __importDefault(require("../db/redis"));
const teamRepository_1 = require("./teamRepository");
class Room extends redis_om_1.Entity {
    formatted() {
        var _a;
        return {
            id: this.entityId,
            name: this.name,
            teams: (_a = this.teams) !== null && _a !== void 0 ? _a : [],
        };
    }
    delete() {
        return __awaiter(this, void 0, void 0, function* () {
            yield exports.roomRepository.remove(this.entityId);
        });
    }
    isEmpty() {
        return this.teams.length === 0;
    }
    addTeam(teamId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.teams.push(teamId);
            yield exports.roomRepository.save(this);
        });
    }
    removeTeam(teamId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.teams = this.teams.filter(team => team !== teamId);
            yield exports.roomRepository.save(this);
        });
    }
    populate() {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, name, teams } = this.formatted();
            return {
                id,
                name,
                teams: yield (0, teamRepository_1.fetchTeams)(teams),
            };
        });
    }
    static populated(room) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield room.populate();
        });
    }
}
const schema = new redis_om_1.Schema(Room, {
    name: { type: "string" },
    teams: { type: "string[]" },
});
exports.roomRepository = redis_1.default.fetchRepository(schema);
const getAllRooms = () => __awaiter(void 0, void 0, void 0, function* () { return (yield exports.roomRepository.search().return.all()).map((room) => room.formatted()); });
exports.getAllRooms = getAllRooms;
const populate = (rooms) => __awaiter(void 0, void 0, void 0, function* () { return yield Promise.all(rooms.map(Room.populated)); });
exports.populate = populate;
const createRoom = (name) => __awaiter(void 0, void 0, void 0, function* () { return (yield exports.roomRepository.createAndSave({ name, teams: [] })).formatted(); });
exports.createRoom = createRoom;
const getRoomById = (id) => __awaiter(void 0, void 0, void 0, function* () { return yield exports.roomRepository.fetch(id); });
exports.getRoomById = getRoomById;
const removeTeam = (teamId, roomId) => __awaiter(void 0, void 0, void 0, function* () {
    const room = yield exports.roomRepository.fetch(roomId);
    yield room.removeTeam(teamId);
    return room;
});
exports.removeTeam = removeTeam;
const initialize = () => __awaiter(void 0, void 0, void 0, function* () {
    yield exports.roomRepository.createIndex();
    console.log("room index built");
});
exports.initialize = initialize;
(0, exports.initialize)();
