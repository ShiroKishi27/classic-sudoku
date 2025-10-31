import React from "react";

const GameStatus = ({ status, handleReset, handleNewGame }) => {
  return (
    <div className="bg-new-game-secondary/70 text-new-game-primary absolute top-1/2 left-1/2 mt-5.5 flex h-[522px] w-[346px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-lg text-center text-xl font-semibold uppercase md:mt-[30px] md:h-[422px] md:w-[650px] md:text-2xl">
      {status}
      <div className="text-new-game-secondary flex flex-row gap-3 text-sm">
        <button
          onClick={handleReset}
          className="bg-new-game-primary cursor-pointer px-2 py-3.5 md:px-2.5 md:py-3"
        >
          Reset
        </button>
        <button
          onClick={handleNewGame}
          className="bg-new-game-primary cursor-pointer px-2 py-3.5 md:px-2.5 md:py-3"
        >
          New Game
        </button>
      </div>
    </div>
  );
};

export default GameStatus;
