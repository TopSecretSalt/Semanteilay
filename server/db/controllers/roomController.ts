import { roomRepository as repository } from "../repositories/roomRepository"
import { teamRepository } from "../repositories/teamRepository";
import { userRepository } from "../repositories/userRepository";
import { Router } from 'express'

export const router = Router();

router.post('/', async (req, res) => {
    // TODO: connect room and team
    
    const room = repository.createEntity({name: req.body.roomName});
    const user = await userRepository.fetch(req.body.user.id);
    const {entityId: teamId} = await teamRepository.createAndSave({members: [user.entityId]})
    const roomId = await repository.save(room)

    res.send({ roomId, teamId })
})

router.get('/:id', async (req, res) => {
    const room = await repository.fetch(req.params.id)
    res.send(room)
})