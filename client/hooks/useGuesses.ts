import { addGuess as postGuess, GET_ALL_TEAM_GUESSES_URL as url } from "../api/guessApi";
import { fetcher } from "../api/api";
import useSWR from "swr";
import { Guess } from "../models";
import { guess } from "../api/semantleApi";
import { useContext, useEffect, useReducer } from "react";
import useUser from "./useUser";
import { SocketContext } from "../context/socket";

function reducer(state: Guess[], action: { payload: Guess[]; type: "add" | 'update' }) {
  switch (action.type) {
    case "add":
      return [...action.payload, ...state.sort(
        (guess, otherGuess) => otherGuess.score - guess.score
      )];
    case "update":
      return action.payload;
    default:
      throw new Error();
  }
}

export const useGuesses = () => {
  const socket = useContext(SocketContext);
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

  useEffect(() => {
    const addGuess = (guess: Guess) => {
      dispatch({ payload: [guess], type: "add" });
      console.log(guess);
    }
    socket.on("newGuess", addGuess);

    return () => {
      socket.removeListener("newGuess", addGuess);
    };
  }, [socket]);

  const addGuess = async (guess: Omit<Guess, 'serialNumber'>) => {
    const newGuess = await postGuess(guess);
    dispatch({ payload: [newGuess], type: "add" });
    socket.emit("newGuess", guess);
  };

  return {
    guesses,
    isLoading: !error && !guesses,
    isError: !!error,
    addGuess,
    guess,
  };
};
