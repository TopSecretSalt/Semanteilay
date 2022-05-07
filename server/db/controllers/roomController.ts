import { roomRepository as repository } from "../repositories/roomRepository"
import { Router } from 'express'

export const router = Router();

router.post('/', async (req, res) => {
    const room = await repository.createAndSave({name: req.body.roomName});
    res.send(room);
})

router.get('/:id', async (req, res) => {
    const room = await repository.fetch(req.params.id)
    res.send(room)
})