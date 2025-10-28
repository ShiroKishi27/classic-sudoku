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
    <div className="flex flex-col md:ml-5">
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
          className={clsx(
            "mx-1.5 cursor-pointer px-2.5 py-1.5 transition-all duration-300 ease-in hover:bg-[#636363] md:p-4",
            isPencilMark ? "bg-white" : "",
          )}
        >
          <PencilLine className={clsx(isPencilMark ? "text-black/80" : "")} />
        </button>
        <button
          onClick={handleReset}
          className="mx-1.5 cursor-pointer px-2.5 py-1.5 transition-all duration-300 ease-in hover:bg-[#636363] md:p-4"
        >
          <RotateCcw />
        </button>
        <button
          onClick={handleErase}
          onMouseDown={(e) => e.preventDefault()}
          className="mx-1.5 cursor-pointer px-2.5 py-1.5 transition-all duration-300 ease-in hover:bg-[#636363] md:p-4"
        >
          <Eraser />
        </button>
      </div>
      <button
        onClick={handleNewGame}
        className="m-1.5 flex cursor-pointer items-center justify-center bg-white px-2.5 py-1.5 font-bold text-black/80 transition-all duration-400 ease-out hover:bg-[#333333] hover:text-white md:px-2.5 md:py-4"
      >
        <Grid3x3 className="mr-2 text-sm md:text-2xl" /> New Game
      </button>
      <div className="mx-1.5 my-2 flex flex-row gap-1.75 md:grid md:grid-cols-3 md:grid-rows-3">
        {Object.entries(numberCounts).map(([num, count]) => {
          const isComplete = count === 9;
          return (
            <button
              key={num}
              onClick={() => handleClick(num)}
              onMouseDown={(e) => e.preventDefault()}
              disabled={isComplete}
              className={clsx(
                "flex aspect-square items-center justify-center bg-black/50 px-1 py-3.5 text-xl transition-all duration-300 ease-in hover:bg-[#636363] md:px-2.5 md:py-5",
                isComplete
                  ? "cursor-default bg-transparent opacity-50 hover:bg-transparent"
                  : "cursor-pointer",
              )}
            >
              {isComplete ? (
                <Check
                  className="animate-scale-in h-3 w-3 rounded-full bg-[#636363] p-1 text-white md:h-6 md:w-6"
                  strokeWidth={3}
                />
              ) : (
                <span
                  className={clsx(
                    "flex h-3 w-3 items-center justify-center md:h-6 md:w-6",
                    isPencilMark ? "text-sm text-gray-500" : "text-blue-700/70",
                  )}
                >
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
