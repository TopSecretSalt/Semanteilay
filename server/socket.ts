import { Server, Socket } from "socket.io";
import * as http from "http";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

type User = {
    id: string,
    name: string
}

type Room = {
    roomId: string,
}

const allRooms = new Map<string, Set<User>>();
const userRooms = new Map<string, Set<Room>>();

const removeUserFromLists = ({ id }: { id: string}) => {
  removeUserFromAllRooms(id)
  userRooms.delete(id);
}

const removeUserFromAllRooms = ( userId: string) => {
    userRooms.get(userId)?.forEach(room => {
      const participants = allRooms.get(room.roomId)?.values();
      if (participants) {
        const filteredParticipants = new Set(Array.from(participants).filter(participant => participant.id !== userId));
        allRooms.set(room.roomId, filteredParticipants);
      }
    })
}

const addRoomToLists = (user: User, room: Room) => {
  const oldRooms = userRooms.get(user.id) ?? new Set();
  const newRooms = oldRooms.add(room)
  userRooms.set(user.id, newRooms);

  allRooms.set(room.roomId, new Set([user]));
}

export function init(server: http.Server) {
  const io = new Server(server, {
    cors: {
      origin: "*", //allowing cors from anywhere
    },
  });

  io.on("connection", (socket) => {
    console.log(`user joined: ${socket.id}`);
    socket.on("disconnect", (reason) => {
      removeUserFromLists({id: socket.id})

      console.log(`user disconnected: ${socket.id} beacause of ${reason}`);
    });
    socket.on("text", (message) => {
      io.emit("text", message);
    });
    socket.on("createRoom", createRoom(socket));
  });

  const createRoom =
  (socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) =>
  ({roomId, userName}: {roomId: string, userName: string}) => {
    socket.join(roomId);
    const user = {id: socket.id, name: userName};
    addRoomToLists(user, { roomId });

    io.emit("room created", {roomId, participants: [user]});
    console.log(`room: ${roomId} was created by: ${socket.id}`);
  };

  const getAllRooms = () => {
    return Array.from(allRooms.entries()).map(([roomId, participants]) => {
      return {roomId, participants: Array.from(participants.values())}
    }) ?? []
  }

  return getAllRooms;
}
