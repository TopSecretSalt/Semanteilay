import { Router } from 'express'
import { createTeam, getTeamById } from "../services/teamService"

export const router = Router();

router.post('/', async (req, res) => {
    const team = await createTeam(req.body);
    console.log('team created');
    res.send(team);
})

router.get('/:id', async (req, res) => {
    const team = await getTeamById(req.params.id);
    res.send(team)
})