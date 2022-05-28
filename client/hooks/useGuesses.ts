import { addGuess as postGuess, GET_ALL_TEAM_GUESSES_URL as url } from "../api/guessApi";
import { fetcher } from "../api/api";
import useSWR from "swr";
import { Guess } from "../models";
import { guess } from "../api/semantleApi";
import { useEffect, useReducer } from "react";
import useUser from "./useUser";

function reducer(state: Guess[], action: { payload: Guess[]; type: "add" | 'update' }) {
  switch (action.type) {
    case "add":
      return [...state, ...action.payload].sort(
        (guess, otherGuess) => otherGuess.score - guess.score
      );
    case "update":
      return action.payload;
    default:
      throw new Error();
  }
}

export const useGuesses = () => {
  const { user } = useUser();
  const { data, error } = useSWR([url, user.teamId], fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  const [guesses, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    dispatch({ payload: data ?? ([] as Guess[]), type: "update" });
  }, [data]);

  const addGuess = async (guess: Guess) => {
    await postGuess(guess);
    dispatch({ payload: [guess], type: "add" });
  };

  return {
    guesses,
    isLoading: !error && !guesses,
    isError: !!error,
    addGuess,
    guess,
  };
};
