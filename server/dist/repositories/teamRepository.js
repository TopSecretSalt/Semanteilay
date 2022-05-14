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
exports.initialize = exports.getTeamById = exports.createTeam = exports.fetchTeams = exports.teamRepository = void 0;
const redis_om_1 = require("redis-om");
const redis_1 = __importDefault(require("../db/redis"));
const userRepository_1 = require("./userRepository");
class Team extends redis_om_1.Entity {
    formatted() {
        var _a;
        return {
            id: this.entityId,
            name: this.name,
            members: (_a = this.members) !== null && _a !== void 0 ? _a : [],
        };
    }
    static populated(team) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, name, members } = team.formatted();
            return {
                id,
                name,
                members: yield (0, userRepository_1.fetchUsers)(members),
            };
        });
    }
}
const schema = new redis_om_1.Schema(Team, {
    members: { type: "string[]" },
    name: { type: "string" },
});
exports.teamRepository = redis_1.default.fetchRepository(schema);
const fetchTeams = (teamsIds) => __awaiter(void 0, void 0, void 0, function* () {
    const teams = yield Promise.all(teamsIds.map(teamId => exports.teamRepository.fetch(teamId)));
    return yield Promise.all(teams.map(Team.populated));
});
exports.fetchTeams = fetchTeams;
const createTeam = (name, members) => __awaiter(void 0, void 0, void 0, function* () { return yield Team.populated(yield exports.teamRepository.createAndSave({ name, members })); });
exports.createTeam = createTeam;
const getTeamById = (id) => __awaiter(void 0, void 0, void 0, function* () { return yield Team.populated(yield exports.teamRepository.fetch(id)); });
exports.getTeamById = getTeamById;
const initialize = () => __awaiter(void 0, void 0, void 0, function* () {
    yield exports.teamRepository.createIndex();
    console.log("team index built");
});
exports.initialize = initialize;
(0, exports.initialize)();
