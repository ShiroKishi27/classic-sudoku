import { useState, useEffect } from "react";
import "./App.css";
import Grid from "./components/Grid";
import Controls from "./components/Controls";
import { fetchBoard } from "./fetchBoard";
const App = () => {
  const [board, setBoard] = useState(null);
  const [puzzle, setPuzzle] = useState(null);
  const [solution, setSolution] = useState(null);
  const [isPencilMode, setIsPencilMode] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(null);
  const [difficulty, setDifficulty] = useState(null);
  useEffect(() => {
    fetchBoard({
      setError,
      setStatus,
      setPuzzle,
      setSolution,
      setBoard,
      setSelected,
      setDifficulty,
    });
  }, []);
  const handleInput = (row_index, col_index, value) => {
    if (value === "" || (value >= 1 && value <= 9)) {
      setBoard((prev) =>
        prev.map((row, r) =>
          row.map((cell, c) => {
            if (r === row_index && c === col_index) {
              return value ? parseInt(value) : null;
            }

            return cell;
          }),
        ),
      );
    }
  };
  const handleClick = (value) => {
    if (!selected) return;
    const [row, col] = selected;
    handleInput(row, col, value);
  };
  const handleCheck = () => {
    const flatBoard = board.flat();
    const flatSolution = solution.flat();

    if (flatBoard.every((cell, i) => cell === flatSolution[i])) {
      setStatus("Congratulations!! You solved it.");
    } else {
      setStatus("You failed");
    }
  };
  const handleReset = () => {
    setBoard(puzzle.map((row) => [...row]));
    setStatus("");
    setSelected(null);
  };

  const handleErase = () => {
    if (!selected) return;
    const [row_idx, col_idx] = selected;
    if (puzzle[row_idx][col_idx] !== null) return;
    setBoard((prev) =>
      prev.map((row, r) =>
        row.map((cell, c) => (r === row_idx && c === col_idx ? null : cell)),
      ),
    );
  };
  const handlePencilMark = () => {
    setIsPencilMode((p) => !p);
  };
  const handleNewGame = () => {
    fetchBoard({
      setError,
      setStatus,
      setPuzzle,
      setSolution,
      setBoard,
      setSelected,
      setDifficulty,
    });
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <h1 className="mb-5 text-center font-bold">Classic Sudoku</h1>
      <div className="flex flex-row items-center justify-center">
        {!board ? (
          <div className="flex h-[496px] w-[823px] items-center justify-center rounded-lg bg-white text-2xl font-semibold text-gray-800">
            Grid Loading...
          </div>
        ) : (
          <>
            <Grid
              board={board}
              puzzle={puzzle}
              selected={selected}
              setSelected={setSelected}
              handleInput={handleInput}
            />

            <Controls
              handleCheck={handleCheck}
              handleReset={handleReset}
              handleErase={handleErase}
              handleNewGame={handleNewGame}
              handleClick={handleClick}
              difficulty={difficulty}
            />
          </>
        )}
        {status && (
          <div className="absolute top-1/2 left-1/2 mt-[38px] flex h-[496px] w-[797px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-lg bg-white/70 text-2xl font-semibold text-gray-800 uppercase">
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
        )}
      </div>
    </>
  );
};

export default App;
