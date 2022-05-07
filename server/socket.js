"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const init = (server) => {
    const io = new socket_io_1.Server(server, {
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
        socket.on("createRoom", createRoom(socket));
    });
    const createRoom = (socket) => ({ roomId, userName }) => {
        socket.join(roomId);
        io.emit("room created", { roomId, participants: [userName] });
        console.log(`room: ${roomId} was created by: ${socket.id}`);
    };
    return io;
};
exports.default = init;
