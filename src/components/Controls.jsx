import { Eraser, RotateCcw, Grid3x3, PencilLine, Check } from "lucide-react";
import clsx from "clsx";
const Controls = ({
  handleReset,
  handleErase,
  handlePencilMark,
  handleNewGame,
  handleClick,
  difficulty,
  isPencilMark,
  mistakeCount,
  numberCounts,
}) => {
  return (
    <div className="ml-5 flex flex-col">
      <div className="flex items-center justify-around text-xs">
        <p>
          <span className="font-bold text-[rgb(182,182,182)]">
            Difficulty:&nbsp;
          </span>
          {difficulty}
        </p>
        <p>
          <span className="font-bold text-[rgb(182,182,182)]">
            Mistakes:&nbsp;
          </span>
          {mistakeCount}/5
        </p>
      </div>
      <div className="my-1.5 flex items-stretch justify-center gap-2">
        <button
          onClick={handlePencilMark}
          className={clsx("mx-1.5", isPencilMark ? "bg-white" : "")}
        >
          <PencilLine className={clsx(isPencilMark ? "text-black/80" : "")} />
        </button>
        <button onClick={handleReset} className="mx-1.5">
          <RotateCcw />
        </button>
        <button
          onClick={handleErase}
          onMouseDown={(e) => e.preventDefault()}
          className="mx-1.5"
        >
          <Eraser />
        </button>
      </div>
      <button
        onClick={handleNewGame}
        className="m-1.5 flex items-center justify-center bg-white font-bold text-black/80"
      >
        <Grid3x3 className="mr-2" /> New Game
      </button>
      <div className="mx-1.5 my-2 grid grid-cols-3 grid-rows-3 gap-3">
        {Object.entries(numberCounts).map(([num, count]) => {
          const isComplete = count === 9;
          return (
            <button
              key={num}
              onClick={() => handleClick(num)}
              onMouseDown={(e) => e.preventDefault()}
              disabled={isComplete}
              className={clsx(
                "flex aspect-square items-center justify-center bg-black/50 text-2xl hover:bg-[#636363]",
                isComplete
                  ? "cursor-default bg-transparent opacity-50 hover:bg-transparent"
                  : "cursor-pointer",
              )}
            >
              {isComplete ? (
                <Check
                  className="animate-scale-in h-6 w-6 rounded-full bg-[#636363] p-1 text-white"
                  strokeWidth={3}
                />
              ) : (
                <span className="flex h-6 w-6 items-center justify-center">
                  {num}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Controls;
