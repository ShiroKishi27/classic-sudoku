import React from "react";

const GameStatus = ({ status, handleReset, handleNewGame }) => {
  return (
    <div className="absolute top-1/2 left-1/2 mt-[38px] flex h-[522px] w-[827px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-lg bg-white/70 text-2xl font-semibold text-gray-800 uppercase">
      {status}
      <div className="flex flex-row gap-3 text-sm text-white">
        <button onClick={handleReset} className="bg-black/80">
          Reset
        </button>
        <button onClick={handleNewGame} className="bg-black/80">
          New Game
        </button>
      </div>
    </div>
  );
};

export default GameStatus;
