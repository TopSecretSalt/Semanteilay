import Guess from "../models/guess";
import * as repository from "../repositories/guessReopository";

export const addGuess = async (guess: Guess) => (await repository.addGuess(guess)).formatted();

export const getAllGuesses = async () =>
  (await repository.getAllGuesses()).map((guess) => guess.formatted());

export const getTeamGuesses = async (teamId: string) =>
  (await repository.getTeamGuesses(teamId)).map((guess) => guess.formatted());
