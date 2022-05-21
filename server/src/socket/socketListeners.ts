import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { deleteUser, leaveRoom } from "../services/userService";

type SocketListener = (
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) => (...args: any) => void;

export const createRoom: SocketListener =
  (socket, io) =>
  ({ roomId, userName }: { roomId: string; userName: string }) => {
    socket.join(roomId);

    io.emit("room created", { roomId, participants: [userName] });
    console.log(`room: ${roomId} was created by: ${socket.id}`);
  };

export const removeSocket: SocketListener = (socket) => () => {
  const userId = socket.data.userId;

  console.log(`user left with id: ${userId}`);

  socket.rooms.forEach(async (roomId) => {
    if (roomId !== socket.id) {
      await leaveRoom(userId, roomId);
      socket.to(roomId).emit("participantUpdate");
    }
  });
  
  deleteUser(userId);
};
