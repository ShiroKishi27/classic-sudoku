import React from "react";

const Controls = ({
  handleCheck,
  handleReset,
  handleErase,
  handleNewGame,
  handleClick,
}) => {
  const number_buttons = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <div className="m-5 flex flex-col">
      <div className="my-2">
        <button onClick={handleCheck} className="mx-1.5">
          Check
        </button>
        <button onClick={handleReset} className="mx-1.5">
          Reset
        </button>
        <button onClick={handleErase} className="mx-1.5">
          Erase
        </button>
        {/* <button onClick={""} className="mx-1.5">
          Pencil Mark
        </button> */}
      </div>
      <button onClick={handleNewGame} className="mx-1.5 my-2">
        New Game
      </button>
      <div className="mx-1.5 my-2 grid grid-cols-3 grid-rows-3 gap-3">
        {number_buttons.map((btn) => (
          <button
            onClick={() => handleClick(btn)}
            onMouseDown={(e) => e.preventDefault()}
            className=""
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
