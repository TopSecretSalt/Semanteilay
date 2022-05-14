"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const userRepository_1 = require("../repositories/userRepository");
const express_1 = require("express");
exports.router = (0, express_1.Router)();
exports.router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = userRepository_1.userRepository.createEntity({ name: req.body.name });
    const id = yield userRepository_1.userRepository.save(user);
    res.send({ id });
}));
exports.router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userRepository_1.userRepository.fetch(req.params.id);
    res.send(user);
}));
