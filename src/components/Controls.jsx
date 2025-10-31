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
    <div className="mt-4 flex flex-col md:mt-0 md:ml-5">
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
          onMouseDown={(e) => e.preventDefault()}
          className={clsx(
            "mx-1.5 flex h-14 w-14 cursor-pointer items-center justify-center !rounded-full p-1.25 transition-all duration-300 ease-in hover:bg-[#636363] md:p-4",
            isPencilMark ? "!border !border-cyan-400" : "",
          )}
        >
          <PencilLine
            className={clsx("h-5 w-5", isPencilMark ? "text-cyan-400" : "")}
          />
        </button>
        <button
          onClick={handleReset}
          className="mx-1.5 flex h-14 w-14 cursor-pointer items-center justify-center !rounded-full p-1.25 transition-all duration-300 ease-in hover:bg-[#636363] md:p-4"
        >
          <RotateCcw className="h-5 w-5" />
        </button>
        <button
          onClick={handleErase}
          onMouseDown={(e) => e.preventDefault()}
          className="mx-1.5 flex h-14 w-14 cursor-pointer items-center justify-center !rounded-full p-1.25 transition-all duration-300 ease-in hover:bg-[#636363] md:p-4"
        >
          <Eraser className="h-5 w-5" />
        </button>
      </div>
      <button
        onClick={handleNewGame}
        className="flex cursor-pointer items-center justify-center bg-white px-2.5 py-1.5 font-bold text-black/80 transition-all duration-400 ease-out hover:bg-[#636363] hover:text-white md:px-2 md:py-3"
      >
        <Grid3x3 className="mr-2 text-sm md:text-2xl" /> New Game
      </button>
      <div className="mt-3 flex flex-row gap-1.75 md:grid md:grid-cols-3 md:grid-rows-3">
        {numberCounts &&
          Object.entries(numberCounts).map(([num, count]) => {
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
                      isPencilMark ? "text-sm text-gray-500" : "text-sky-400",
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
