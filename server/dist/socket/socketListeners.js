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
exports.removeSocket = exports.createRoom = void 0;
const userService_1 = require("../services/userService");
const createRoom = (socket, io) => ({ roomId, userName }) => {
    socket.join(roomId);
    io.emit("room created", { roomId, participants: [userName] });
    console.log(`room: ${roomId} was created by: ${socket.id}`);
};
exports.createRoom = createRoom;
const removeSocket = (socket) => () => {
    const userId = socket.data.userId;
    console.log(`user left with id: ${userId}`);
    socket.rooms.forEach((roomId) => __awaiter(void 0, void 0, void 0, function* () {
        if (roomId !== socket.id) {
            yield (0, userService_1.leaveRoom)(userId, roomId);
            socket.to(roomId).emit("participantUpdate");
        }
    }));
    (0, userService_1.deleteUser)(userId);
};
exports.removeSocket = removeSocket;
