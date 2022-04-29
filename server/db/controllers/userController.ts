import { userRepository as repository } from "../repositories/userRepository"
import { Router } from 'express'

export const router = Router();

router.post('/', async (req, res) => {
    
    const user = repository.createEntity();
    let id = await repository.save(user)

    res.send({ id })
})

router.get('/:id', async (req, res) => {
    const user = await repository.fetch(req.params.id)
    res.send(user)
})