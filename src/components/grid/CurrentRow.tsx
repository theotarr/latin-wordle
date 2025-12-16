import { Cell } from "./Cell";
import classnames from "classnames";

type Props = {
  guess: string;
  shake?: boolean;
};

export const CurrentRow = ({ guess, shake }: Props) => {
  const splitGuess = guess.split("");
  const emptyCells = Array.from(Array(5 - splitGuess.length));

  return (
    <div className={classnames("flex justify-center mb-1", { "shake-animation": shake })}>
      {splitGuess.map((letter, i) => (
        <Cell key={i} value={letter} />
      ))}
      {emptyCells.map((_, i) => (
        <Cell key={i} />
      ))}
    </div>
  );
};
