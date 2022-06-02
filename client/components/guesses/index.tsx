import { FC } from "react";
import MakeGuess from "../makeGuess";
import { useGuesses } from "../../hooks/useGuesses";
import useUser from "../../hooks/useUser";
import Guess from "../guess";

const Guesses: FC = () => {
  const { guesses, addGuess, isLoading, isError, guess } = useGuesses();
  const { user } = useUser();

  if (isError || isLoading) return <h1>hi</h1>;

  return (
    <>
      <MakeGuess
        handleGuess={async (word: string) => {
          const {similarity: score, distance: rank} = await guess(word);
          addGuess({word, score, rank, owner: user.id, team: user.teamId as string}); // TODO: add last guess view
        }}
      />
      <div>
        {guesses.map(guess => <Guess key={guess.word} guess={guess}/>)}
      </div>
    </>
  );
};

export default Guesses;
