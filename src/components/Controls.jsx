import React from "react";
import { Eraser, RotateCcw, Grid3x3, SquareCheckBig } from "lucide-react";
const Controls = ({
  handleCheck,
  handleReset,
  handleErase,
  handleNewGame,
  handleClick,
  difficulty,
}) => {
  const number_buttons = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <div className="ml-5 flex flex-col">
      <div className="flex items-center justify-center">
        <p className="font-bold text-[rgb(182,182,182)]">Difficulty:&nbsp;</p>
        {difficulty}
      </div>
      <div className="my-1.5 flex items-stretch justify-center">
        <button onClick={handleCheck} className="mx-1.5">
          <SquareCheckBig />
        </button>
        <button onClick={handleReset} className="mx-1.5">
          <RotateCcw />
        </button>
        <button onClick={handleErase} className="mx-1.5">
          <Eraser />
        </button>

        {/* <button onClick={""} className="mx-1.5">
          Pencil Mark
        </button> */}
      </div>
      <button
        onClick={handleNewGame}
        className="m-1.5 flex items-center justify-center bg-white font-bold text-black/80"
      >
        <Grid3x3 className="mr-2" /> New Game
      </button>
      <div className="mx-1.5 my-2 grid grid-cols-3 grid-rows-3 gap-3">
        {number_buttons.map((btn) => (
          <button
            onClick={() => handleClick(btn)}
            onMouseDown={(e) => e.preventDefault()}
            className="h-28 bg-black/50 text-2xl"
            key={btn}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Controls;
