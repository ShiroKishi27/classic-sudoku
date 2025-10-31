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
          Difficulty:&nbsp;
          <span className="text-clues font-bold">{difficulty}</span>
        </p>
        <p>
          Mistakes:&nbsp;
          <span className="text-clues font-bold">{mistakeCount}/5</span>
        </p>
      </div>
      <div className="my-1.5 flex items-stretch justify-center gap-2">
        <button
          onClick={handlePencilMark}
          onMouseDown={(e) => e.preventDefault()}
          className={clsx(
            "hover:bg-foreground mx-1.5 flex h-14 w-14 cursor-pointer items-center justify-center !rounded-full p-1.25 transition-all duration-300 ease-in md:p-4",
            isPencilMark ? "!border-entry !border" : "",
          )}
        >
          <PencilLine
            className={clsx("h-5 w-5", isPencilMark ? "text-entry" : "")}
          />
        </button>
        <button
          onClick={handleReset}
          className="hover:bg-foreground mx-1.5 flex h-14 w-14 cursor-pointer items-center justify-center !rounded-full p-1.25 transition-all duration-300 ease-in md:p-4"
        >
          <RotateCcw className="h-5 w-5" />
        </button>
        <button
          onClick={handleErase}
          onMouseDown={(e) => e.preventDefault()}
          className="hover:bg-foreground mx-1.5 flex h-14 w-14 cursor-pointer items-center justify-center !rounded-full p-1.25 transition-all duration-300 ease-in md:p-4"
        >
          <Eraser className="h-5 w-5" />
        </button>
      </div>
      <button
        onClick={handleNewGame}
        className="bg-new-game-secondary text-new-game-primary hover:bg-foreground hover:text-new-game-secondary flex cursor-pointer items-center justify-center px-2.5 py-1.5 font-bold transition-all duration-400 ease-out md:px-2 md:py-3"
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
                  "bg-grid-btn hover:bg-foreground flex aspect-square items-center justify-center px-1 py-3.5 text-xl transition-all duration-300 ease-in md:px-2.5 md:py-5",
                  isComplete
                    ? "cursor-default bg-transparent opacity-50 hover:bg-transparent"
                    : "cursor-pointer",
                )}
              >
                {isComplete ? (
                  <Check
                    className="animate-scale-in bg-foreground text-new-game-secondary h-3 w-3 rounded-full p-1 md:h-6 md:w-6"
                    strokeWidth={3}
                  />
                ) : (
                  <span
                    className={clsx(
                      "flex h-3 w-3 items-center justify-center md:h-6 md:w-6",
                      isPencilMark ? "text-clues text-sm" : "text-entry",
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
