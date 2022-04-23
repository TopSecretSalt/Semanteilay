import express from "express";
import * as http from "http";
import * as Socket from "./socket";
import next from "next";
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

const app = express();
const server = http.createServer(app);

nextApp.prepare().then(() => {
  const getAllRooms = Socket.init(server);

  app.get("/", async (req, res: any) => {
    res.rooms = getAllRooms()

    return nextApp.render(req, res, '/')
  })
  
  app.get("/a", (req, res) => {
    res.send("Websocket Server");
  });

  app.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(9000, () => {
    console.log("listening on port 9000");
  });
});
