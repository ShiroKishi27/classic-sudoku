import React from "react";

const GameStatus = ({ status, handleReset, handleNewGame }) => {
  return (
    <div className="absolute top-1/2 left-1/2 mt-5.5 flex h-[522px] w-[346px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-lg bg-white/70 text-center text-xl font-semibold text-gray-800 uppercase md:mt-[30px] md:h-[422px] md:w-[650px] md:text-2xl">
      {status}
      <div className="flex flex-row gap-3 text-sm text-white">
        <button
          onClick={handleReset}
          className="cursor-pointer bg-black/80 px-2 py-3.5 md:px-2.5 md:py-3"
        >
          Reset
        </button>
        <button
          onClick={handleNewGame}
          className="cursor-pointer bg-black/80 px-2 py-3.5 md:px-2.5 md:py-3"
        >
          New Game
        </button>
      </div>
    </div>
  );
};

export default GameStatus;
