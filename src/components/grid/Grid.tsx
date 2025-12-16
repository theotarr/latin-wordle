import { CompletedRow } from "./CompletedRow";
import { CurrentRow } from "./CurrentRow";
import { EmptyRow } from "./EmptyRow";
import { solution } from "../../lib/words";

type Props = {
  guesses: string[];
  currentGuess: string;
  isGameWon?: boolean;
  shouldShake?: boolean;
};

export const Grid = ({ guesses, currentGuess, isGameWon, shouldShake }: Props) => {
  const empties =
    guesses.length < 5 ? Array.from(Array(5 - guesses.length)) : [];

  return (
    <div className="pb-6">
      {guesses.map((guess, i) => {
        const isWinningRow = isGameWon && guess === solution && i === guesses.length - 1;
        return <CompletedRow key={i} guess={guess} bounce={isWinningRow} />;
      })}
      {guesses.length < 6 && <CurrentRow guess={currentGuess} shake={shouldShake} />}
      {empties.map((_, i) => (
        <EmptyRow key={i} />
      ))}
    </div>
  );
};
