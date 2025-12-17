import { getGuessStatuses } from "../../lib/statuses";
import { Cell } from "./Cell";
import classnames from "classnames";

type Props = {
  guess: string;
  bounce?: boolean;
};

export const CompletedRow = ({ guess, bounce }: Props) => {
  const statuses = getGuessStatuses(guess);

  return (
    <div
      className={classnames("flex justify-center mb-1", {
        "bounce-animation": bounce,
      })}
    >
      {guess.split("").map((letter, i) => (
        <Cell key={i} value={letter} status={statuses[i]} cellIndex={i} />
      ))}
    </div>
  );
};
