import { Server, Socket } from "socket.io";
import * as http from "http";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

const init = (server: http.Server) => {
  const io = new Server(server, {
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

  const createRoom =
  (socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) =>
  ({roomId, userName}: {roomId: string, userName: string}) => {
    socket.join(roomId);
  
    io.emit("room created", {roomId, participants: [userName]});
    console.log(`room: ${roomId} was created by: ${socket.id}`);
  };

  return io;
}

export default init;