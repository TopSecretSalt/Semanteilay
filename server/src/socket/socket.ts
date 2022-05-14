import { Server, Socket } from "socket.io";
import * as http from "http";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

let io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;

const init = (server: http.Server) => {
  io = new Server(server, {
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
      console.log(`joined: ${socket.id}`)
      io.of('/').to(id).emit('participantUpdate');
    });

    socket.on("leaveRoom", ({ id }) => {
      socket.leave(id);
      console.log(`left: ${socket.id}`);
      io.of('/').to(id).emit('participantUpdate');
    });

    socket.on('leaveQuick', console.log)

    socket.on("joinLobby", () => {
      socket.join("lobby");
    });
  });
};

const createRoom =
  (
    socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
    io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
  ) =>
  ({ roomId, userName }: { roomId: string; userName: string }) => {
    socket.join(roomId);

    io.emit("room created", { roomId, participants: [userName] });
    console.log(`room: ${roomId} was created by: ${socket.id}`);
  };

export const mapParticipants = (
  rooms: {
    id: string;
    name: string;
    teams: string[];
  }[]
) => {
  return rooms.map((room) => {
    const participantCount = io.sockets.adapter.rooms.get(room.id)?.size ?? 0;
    return { ...room, participantCount };
  });
};

export default init;
