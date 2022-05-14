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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialize = exports.guessRepository = void 0;
const redis_om_1 = require("redis-om");
const redis_1 = __importDefault(require("../db/redis"));
class Guess extends redis_om_1.Entity {
}
const schema = new redis_om_1.Schema(Guess, {
    word: { type: 'string' },
    score: { type: 'number' },
    socket: { type: 'string' },
    owner: { type: 'string' },
    team: { type: 'string' }
});
exports.guessRepository = redis_1.default.fetchRepository(schema);
const initialize = () => __awaiter(void 0, void 0, void 0, function* () {
    yield exports.guessRepository.createIndex();
    console.log("guess index built");
});
exports.initialize = initialize;
(0, exports.initialize)();
