import { useState, useEffect, useRef, useCallback } from "react";
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
  const [conflicts, setConflicts] = useState(new Set());
  const [mistakeCount, setMistakeCount] = useState(0);
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;
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

  useEffect(() => {
    if (board && solution) {
      handleCheck(board);
    }
  }, [board]);

  const handleInput = (row, col, value) => {
    // TODO: Implement input for notes/pencil marks
    const digit = value.slice(-1);
    setBoard((prevBoard) => {
      const newBoard = prevBoard.map((r, ri) =>
        r.map((cell, ci) =>
          ri === row && ci === col
            ? digit >= "1" && digit <= "9"
              ? cell === parseInt(digit, 10)
                ? null
                : parseInt(digit, 10)
              : null
            : cell,
        ),
      );

      return newBoard;
    });
  };

  const handleMistake = () => {
    let total = 0;
    setMistakeCount((prev) => {
      total = prev + 1;
      if (total >= 5) {
        setStatus("💀 Game Over!! You failed..");
      }

      return total;
    });
  };

  const handleClick = (value) => {
    if (!selected) return;
    const [row, col] = selected;
    if (puzzle[row][col] !== null) return;
    handleInput(row, col, value);
  };

  const handleCheck = useCallback(
    (board) => {
      if (!solution) return;

      let newConflicts = new Set();

      board.forEach((row, r) => {
        row.forEach((cell, c) => {
          if (cell !== null && cell !== solution[r][c]) {
            newConflicts.add(`${r}-${c}-${cell}`); // store "r-c" as unique key
            if (!conflicts.has(`${r}-${c}-${cell}`)) {
              handleMistake();
            }
          }
        });
      });
      const isSolved =
        newConflicts.size === 0 && board.flat().every((cell) => cell !== null);
      if (isSolved) setStatus("🎉 Congratulations! You solved it!");

      setConflicts(newConflicts);
    },
    [solution, conflicts],
  );

  const handleReset = () => {
    setBoard(puzzle.map((row) => [...row]));
    setStatus("");
    setSelected(null);
    setConflicts(new Set());
    setIsPencilMode(false);
    setMistakeCount(0);
  };

  const handleErase = () => {
    if (!selected) return;
    const [row_idx, col_idx] = selected;

    if (puzzle[row_idx][col_idx] !== null) return;

    setBoard((prev) => {
      const updated = prev.map((row, r) =>
        row.map((cell, c) => (r === row_idx && c === col_idx ? null : cell)),
      );
      return updated;
    });
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
    setMistakeCount(0);
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <h1 className="mb-5 text-center font-bold">Classic Sudoku</h1>
      <div className="flex flex-row items-center justify-center">
        {!board ? (
          <div className="flex h-[496px] w-[823px] items-center justify-center rounded-lg bg-[#636363] text-2xl font-semibold text-white/80">
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
              conflicts={conflicts}
            />

            <Controls
              handlePencilMark={handlePencilMark}
              handleReset={handleReset}
              handleErase={handleErase}
              handleNewGame={handleNewGame}
              handleClick={handleClick}
              difficulty={difficulty}
              isPencilMark={isPencilMode}
              mistakeCount={mistakeCount}
            />
          </>
        )}
        {status && (
          <div className="absolute top-1/2 left-1/2 mt-[38px] flex h-[522px] w-[797px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-lg bg-white/70 text-2xl font-semibold text-gray-800 uppercase">
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
