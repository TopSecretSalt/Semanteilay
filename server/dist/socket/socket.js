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
exports.hookSocketWithUser = exports.getParticipantCount = void 0;
const socket_io_1 = require("socket.io");
const socketListeners_1 = require("./socketListeners");
let io;
const init = (server) => {
    io = new socket_io_1.Server(server, {
        cors: {
            origin: "*", //allowing cors from anywhere
        },
    });
    io.on("connection", (socket) => {
        console.log(`user joined: ${socket.id}`);
        socket.on("disconnect", (reason) => {
            console.log(`user disconnected: ${socket.id} beacause of ${reason}`);
        });
        socket.on("disconnecting", (0, socketListeners_1.removeSocket)(socket, io));
        socket.on("createRoom", (0, socketListeners_1.createRoom)(socket, io));
        socket.on("joinRoom", ({ id }) => {
            socket.join(id);
            console.log(`joined: ${socket.id}`);
            io.of("/").to(id).emit("participantUpdate");
        });
        socket.on("leaveRoom", ({ id }) => {
            socket.leave(id);
            console.log(`left: ${socket.id}`);
            io.of("/").to(id).emit("participantUpdate");
        });
        socket.on("joinLobby", () => {
            socket.join("lobby");
        });
    });
    io.of("/").adapter.on("delete-room", () => {
        io.to("lobby").emit("roomsUpdated"); // TODO: consider moving from SWR to emitting map of rooms and participants
    });
};
const getParticipantCount = ({ id }) => { var _a, _b; return (_b = (_a = io.sockets.adapter.rooms.get(id)) === null || _a === void 0 ? void 0 : _a.size) !== null && _b !== void 0 ? _b : 0; };
exports.getParticipantCount = getParticipantCount;
const hookSocketWithUser = (userId, socketId) => __awaiter(void 0, void 0, void 0, function* () { return ((yield io.in(socketId).fetchSockets())[0].data.userId = userId); });
exports.hookSocketWithUser = hookSocketWithUser;
exports.default = init;
