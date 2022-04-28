var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import * as http from "http";
import init from "./socket.js";
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
    app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        res.rooms = getAllRooms();
        return nextApp.render(req, res, '/');
    }));
    app.get("*", (req, res) => {
        return handle(req, res);
    });
    server.listen(9000, () => {
        console.log("listening on port 9000");
    });
});
