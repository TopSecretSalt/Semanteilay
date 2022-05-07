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
const roomRepository_1 = require("../repositories/roomRepository");
const express_1 = require("express");
exports.router = (0, express_1.Router)();
exports.router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const room = yield roomRepository_1.roomRepository.createAndSave({ name: req.body.roomName });
    res.send(room);
}));
exports.router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const room = yield roomRepository_1.roomRepository.fetch(req.params.id);
    res.send(room);
}));
