import { FC } from "react";
import { Guess } from "../../models";

interface Props {
    guess: Guess,
}

const Guess: FC<Props> = ({ guess }) => {
  return <h3> {guess.word} <span> {guess.score}</span></h3>
};

export default Guess;
