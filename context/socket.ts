import socketio from "socket.io-client";
import React from "react";

export const socket = socketio(process.env.SOCKET_URL ?? "http://localhost:9000/");
export const SocketContext = React.createContext(socket);