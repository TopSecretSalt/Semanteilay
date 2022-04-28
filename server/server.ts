import express from "express";
import * as http from "http";
import init from "./socket.js"
import next from "next";
import { router as userRouter } from "./db/controllers/userController";

console.log(process.env);

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

const app = express();
app.use(express.json());
const server = http.createServer(app);

nextApp.prepare().then(() => {
  const getAllRooms = init(server);

  app.use('/user', userRouter);

  app.get("/", async (req, res: any) => {
    res.rooms = getAllRooms()

    return nextApp.render(req, res, '/')
  })

  app.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(9000, () => {
    console.log("listening on port 9000");
  });
});
