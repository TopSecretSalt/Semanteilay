import { Server } from "socket.io";
const allRooms = new Map();
const userRooms = new Map();
const removeUserFromLists = ({ id }) => {
    removeUserFromAllRooms(id);
    userRooms.delete(id);
};
const removeUserFromAllRooms = (userId) => {
    var _a;
    (_a = userRooms.get(userId)) === null || _a === void 0 ? void 0 : _a.forEach(room => {
        var _a;
        const participants = (_a = allRooms.get(room.roomId)) === null || _a === void 0 ? void 0 : _a.values();
        if (participants) {
            const filteredParticipants = new Set(Array.from(participants).filter(participant => participant.id !== userId));
            allRooms.set(room.roomId, filteredParticipants);
        }
    });
};
const addRoomToLists = (user, room) => {
    var _a;
    const oldRooms = (_a = userRooms.get(user.id)) !== null && _a !== void 0 ? _a : new Set();
    const newRooms = oldRooms.add(room);
    userRooms.set(user.id, newRooms);
    allRooms.set(room.roomId, new Set([user]));
};
const init = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*", //allowing cors from anywhere
        },
    });
    io.on("connection", (socket) => {
        console.log(`user joined: ${socket.id}`);
        socket.on("disconnect", (reason) => {
            removeUserFromLists({ id: socket.id });
            console.log(`user disconnected: ${socket.id} beacause of ${reason}`);
        });
        socket.on("text", (message) => {
            io.emit("text", message);
        });
        socket.on("createRoom", createRoom(socket));
    });
    const createRoom = (socket) => ({ roomId, userName }) => {
        socket.join(roomId);
        const user = { id: socket.id, name: userName };
        addRoomToLists(user, { roomId });
        io.emit("room created", { roomId, participants: [user] });
        console.log(`room: ${roomId} was created by: ${socket.id}`);
    };
    const getAllRooms = () => {
        var _a;
        return (_a = Array.from(allRooms.entries()).map(([roomId, participants]) => {
            return { roomId, participants: Array.from(participants.values()) };
        })) !== null && _a !== void 0 ? _a : [];
    };
    return getAllRooms;
};
export default init;
