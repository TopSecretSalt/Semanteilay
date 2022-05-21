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
exports.getAllTeams = exports.changeTeam = exports.joinTeam = exports.leaveTeam = exports.createTeam = exports.getTeamById = void 0;
const repository = __importStar(require("../repositories/teamRepository"));
const roomService_1 = require("./roomService");
const getTeamById = (id) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getTeamById(id); });
exports.getTeamById = getTeamById;
const createTeam = ({ name, userId, roomId }) => __awaiter(void 0, void 0, void 0, function* () {
    const team = yield repository.createTeam(name, userId);
    yield (0, roomService_1.addTeamToRoom)(roomId, team.id);
    return team;
});
exports.createTeam = createTeam;
const leaveTeam = (userId, teamId, roomId) => __awaiter(void 0, void 0, void 0, function* () {
    const team = yield repository.leaveTeam(userId, teamId);
    if (team.isEmpty()) {
        yield (0, roomService_1.removeTeamFromRoom)(roomId, teamId);
        yield repository.deleteTeam(teamId);
    }
});
exports.leaveTeam = leaveTeam;
const joinTeam = (userId, teamId) => __awaiter(void 0, void 0, void 0, function* () {
    yield repository.joinTeam(userId, teamId);
});
exports.joinTeam = joinTeam;
const changeTeam = (userId, teamId, roomdId) => __awaiter(void 0, void 0, void 0, function* () {
    const oldTeam = yield repository.getTeamByUser(userId);
    console.log("changing teams");
    if (oldTeam && oldTeam.entityId !== teamId) { // TODO: maybe fix band-aid looking code
        console.log("leaving old team");
        yield (0, exports.leaveTeam)(userId, oldTeam.entityId, roomdId);
    }
    yield (0, exports.joinTeam)(userId, teamId); // TODO: fix having two replica members in team
});
exports.changeTeam = changeTeam;
const getAllTeams = () => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getAllTeams(); });
exports.getAllTeams = getAllTeams;
