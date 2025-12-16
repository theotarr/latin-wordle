import { useState, useEffect } from "react";
import { CharStatus } from "../../lib/statuses";
import classnames from "classnames";

type Props = {
  value?: string;
  status?: CharStatus;
  cellIndex?: number;
};

export const Cell = ({ value, status, cellIndex }: Props) => {
  const [revealPhase, setRevealPhase] = useState(() => (status ? 1 : -1));

  useEffect(() => {
    if (status) {
      setRevealPhase(1);
    } else {
      setRevealPhase(-1);
    }
  }, [status]);

  const cellIndexClass = cellIndex !== undefined
    ? `cell-${cellIndex}`
    : "cell-noindex";
  
  const classes = classnames(
    "w-14 h-14 border-solid border-2 flex items-center justify-center mx-0.5 text-lg font-bold rounded",
    cellIndexClass,
    {
      "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-600":
        !status || revealPhase === 1,
      "border-black text-black dark:text-white":
        value && (!status || revealPhase === 1),
      "bg-slate-400 text-white border-slate-400":
        status === "absent" && revealPhase === 2,
      "bg-emerald-500 text-white border-emerald-500":
        status === "correct" && revealPhase === 2,
      "bg-sky-500 text-white border-sky-500":
        status === "present" && revealPhase === 2,
      "cell-animation": !!value,
      "revealing-status1": revealPhase === 1,
      "revealing-status2": revealPhase === 2,
    }
  );

  return (
    <div
      className={classes}
      onAnimationEnd={() => {
        if (revealPhase === 1) {
          setRevealPhase(2);
        }
      }}
    >
      {value}
    </div>
  );
};
