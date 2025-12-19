import { KeyValue } from "../../lib/keyboard";
import { getStatuses } from "../../lib/statuses";
import { Key } from "./Key";
import { useEffect } from "react";

type Props = {
  onChar: (value: string) => void;
  onDelete: () => void;
  onEnter: () => void;
  guesses: string[];
};

export const Keyboard = ({ onChar, onDelete, onEnter, guesses }: Props) => {
  const charStatuses = getStatuses(guesses);

  const onClick = (value: KeyValue) => {
    if (value === "ENTER") {
      onEnter();
    } else if (value === "DELETE") {
      onDelete();
    } else {
      onChar(value);
    }
  };

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.code === "Enter") {
        onEnter();
      } else if (e.code === "Backspace") {
        onDelete();
      } else {
        const key = e.key.toUpperCase();
        if (key.length === 1 && key >= "A" && key <= "Z") {
          onChar(key);
        }
      }
    };
    window.addEventListener("keyup", listener);
    return () => {
      window.removeEventListener("keyup", listener);
    };
  }, [onEnter, onDelete, onChar]);

  return (
    <div>
      <div className="flex justify-center mb-1">
        <Key value="Q" onClick={onClick} status={charStatuses["Q"]} />
        <Key value="W" onClick={onClick} status={charStatuses["W"]} />
        <Key value="E" onClick={onClick} status={charStatuses["E"]} />
        <Key value="R" onClick={onClick} status={charStatuses["R"]} />
        <Key value="T" onClick={onClick} status={charStatuses["T"]} />
        <Key value="Y" onClick={onClick} status={charStatuses["Y"]} />
        <Key value="U" onClick={onClick} status={charStatuses["U"]} />
        <Key value="I" onClick={onClick} status={charStatuses["I"]} />
        <Key value="O" onClick={onClick} status={charStatuses["O"]} />
        <Key value="P" onClick={onClick} status={charStatuses["P"]} />
      </div>
      <div className="flex justify-center mb-1">
        <Key value="A" onClick={onClick} status={charStatuses["A"]} />
        <Key value="S" onClick={onClick} status={charStatuses["S"]} />
        <Key value="D" onClick={onClick} status={charStatuses["D"]} />
        <Key value="F" onClick={onClick} status={charStatuses["F"]} />
        <Key value="G" onClick={onClick} status={charStatuses["G"]} />
        <Key value="H" onClick={onClick} status={charStatuses["H"]} />
        <Key value="J" onClick={onClick} status={charStatuses["J"]} />
        <Key value="K" onClick={onClick} status={charStatuses["K"]} />
        <Key value="L" onClick={onClick} status={charStatuses["L"]} />
      </div>
      <div className="flex justify-center">
        <Key width={65.4} className="text-sm" value="ENTER" onClick={onClick}>
          ENTER
        </Key>
        <Key value="Z" onClick={onClick} status={charStatuses["Z"]} />
        <Key value="X" onClick={onClick} status={charStatuses["X"]} />
        <Key value="C" onClick={onClick} status={charStatuses["C"]} />
        <Key value="V" onClick={onClick} status={charStatuses["V"]} />
        <Key value="B" onClick={onClick} status={charStatuses["B"]} />
        <Key value="N" onClick={onClick} status={charStatuses["N"]} />
        <Key value="M" onClick={onClick} status={charStatuses["M"]} />
        <Key width={65.4} value="DELETE" onClick={onClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="w-6 h-6"
          >
            <path d="M10 5a2 2 0 0 0-1.344.519l-6.328 5.74a1 1 0 0 0 0 1.481l6.328 5.741A2 2 0 0 0 10 19h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z" />
            <path d="m12 9 6 6" />
            <path d="m18 9-6 6" />
          </svg>
        </Key>
      </div>
    </div>
  );
};
