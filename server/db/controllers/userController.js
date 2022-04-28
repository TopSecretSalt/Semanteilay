var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { userRepository as repository } from "../repositories/userRepository";
import { Router } from 'express';
export const router = Router();
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('-1/2');
    const user = repository.createEntity({ name: req.body.name });
    console.log('0/2');
    let id = yield repository.save(user);
    res.send({ id });
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield repository.fetch(req.params.id);
    res.send(user);
}));
