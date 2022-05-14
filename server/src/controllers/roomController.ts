import { getAllRooms, createRoom, getRoomById } from "../services/roomService";
import { Router } from 'express'

export const router = Router();

router.post('/', async (req, res) => {
    const room = await createRoom(req.body.roomName);
    res.send(room);
})

router.get('/:id', async (req, res) => {
    const room = await getRoomById(req.params.id);
    res.send(room)
})

router.get('', async (req, res) => {
    const rooms = await getAllRooms();
    res.send(rooms);
})