import { addGuess, getAllGuesses, getTeamGuesses } from "../services/guessService";
import { Router } from 'express'

export const router = Router();

router.post('/', async (req, res) => {
    const guess = await addGuess(req.body);
    res.send(guess);
})

router.get('/', async (req, res) => {
    const guesses = await getAllGuesses();
    res.send(guesses);
})

router.get('/:id', async (req, res) => {
    const guesses = await getTeamGuesses(req.params.id);
    res.send(guesses);
})