"use strict";
exports.__esModule = true;
exports.init = void 0;
var socket_io_1 = require("socket.io");
var allRooms = new Map();
var userRooms = new Map();
var removeUserFromLists = function (_a) {
    var id = _a.id;
    removeUserFromAllRooms(id);
    userRooms["delete"](id);
};
var removeUserFromAllRooms = function (userId) {
    var _a;
    (_a = userRooms.get(userId)) === null || _a === void 0 ? void 0 : _a.forEach(function (room) {
        var _a;
        var participants = (_a = allRooms.get(room.roomId)) === null || _a === void 0 ? void 0 : _a.values();
        if (participants) {
            var filteredParticipants = new Set(Array.from(participants).filter(function (participant) { return participant.id !== userId; }));
            allRooms.set(room.roomId, filteredParticipants);
        }
    });
};
var addRoomToLists = function (user, room) {
    var _a;
    var oldRooms = (_a = userRooms.get(user.id)) !== null && _a !== void 0 ? _a : new Set();
    var newRooms = oldRooms.add(room);
    userRooms.set(user.id, newRooms);
    allRooms.set(room.roomId, new Set([user]));
};
function init(server) {
    var io = new socket_io_1.Server(server, {
        cors: {
            origin: "*"
        }
    });
    io.on("connection", function (socket) {
        console.log("user joined: ".concat(socket.id));
        socket.on("disconnect", function (reason) {
            removeUserFromLists({ id: socket.id });
            console.log("user disconnected: ".concat(socket.id, " beacause of ").concat(reason));
        });
        socket.on("text", function (message) {
            io.emit("text", message);
        });
        socket.on("createRoom", createRoom(socket));
    });
    var createRoom = function (socket) {
        return function (_a) {
            var roomId = _a.roomId, userName = _a.userName;
            socket.join(roomId);
            var user = { id: socket.id, name: userName };
            addRoomToLists(user, { roomId: roomId });
            io.emit("room created", { roomId: roomId, participants: [user] });
            console.log("room: ".concat(roomId, " was created by: ").concat(socket.id));
        };
    };
    var getAllRooms = function () {
        var _a;
        return (_a = Array.from(allRooms.entries()).map(function (_a) {
            var roomId = _a[0], participants = _a[1];
            return { roomId: roomId, participants: Array.from(participants.values()) };
        })) !== null && _a !== void 0 ? _a : [];
    };
    return getAllRooms;
}
exports.init = init;
