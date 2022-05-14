"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapParticipants = void 0;
const socket_io_1 = require("socket.io");
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
        socket.on("text", (message) => {
            io.emit("text", message);
        });
        socket.on("createRoom", createRoom(socket, io));
        socket.on("joinRoom", ({ id }) => {
            socket.join(id);
            console.log(`joined: ${socket.id}`);
            io.of('/').to(id).emit('participantUpdate');
        });
        socket.on("leaveRoom", ({ id }) => {
            socket.leave(id);
            console.log(`left: ${socket.id}`);
            io.of('/').to(id).emit('participantUpdate');
        });
        socket.on('leaveQuick', console.log);
        socket.on("joinLobby", () => {
            socket.join("lobby");
        });
    });
};
const createRoom = (socket, io) => ({ roomId, userName }) => {
    socket.join(roomId);
    io.emit("room created", { roomId, participants: [userName] });
    console.log(`room: ${roomId} was created by: ${socket.id}`);
};
const mapParticipants = (rooms) => {
    return rooms.map((room) => {
        var _a, _b;
        const participantCount = (_b = (_a = io.sockets.adapter.rooms.get(room.id)) === null || _a === void 0 ? void 0 : _a.size) !== null && _b !== void 0 ? _b : 0;
        return Object.assign(Object.assign({}, room), { participantCount });
    });
};
exports.mapParticipants = mapParticipants;
exports.default = init;
