"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const http = __importStar(require("http"));
const socket_js_1 = __importDefault(require("./socket.js"));
const next_1 = __importDefault(require("next"));
const userController_1 = require("./db/controllers/userController");
const roomController_1 = require("./db/controllers/roomController");
const dev = process.env.NODE_ENV !== "production";
const nextApp = (0, next_1.default)({ dev });
const handle = nextApp.getRequestHandler();
const app = (0, express_1.default)();
app.use(express_1.default.json());
const server = http.createServer(app);
nextApp.prepare().then(() => {
    const getAllRooms = (0, socket_js_1.default)(server);
    app.use('/users', userController_1.router);
    app.use('/rooms', roomController_1.router);
    app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        return nextApp.render(req, res, '/');
    }));
    app.get("/play", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        res.rooms = getAllRooms();
        return nextApp.render(req, res, '/play');
    }));
    app.get("*", (req, res) => {
        return handle(req, res);
    });
    server.listen(9000, () => {
        console.log("listening on http://localhost:9000/");
    });
});
