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
exports.router = void 0;
const express_1 = require("express");
const teamRepository_1 = require("../repositories/teamRepository");
const teamService_1 = require("../services/teamService");
exports.router = (0, express_1.Router)();
exports.router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const team = yield (0, teamService_1.createTeam)(req.body);
    res.send(team.id);
}));
exports.router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const team = yield (0, teamService_1.getTeamById)(req.params.id);
    res.send(team);
}));
exports.router.get("", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const teams = yield (0, teamService_1.getAllTeams)();
    res.send(teams);
}));
exports.router.patch("", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, teamId, roomId } = req.body;
    yield (0, teamService_1.changeTeam)(userId, teamId, roomId);
    res.status(200).send();
}));
exports.router.get("/a/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const teams = yield (0, teamRepository_1.getTeamByUser)(req.params.id);
    res.send(teams);
}));
