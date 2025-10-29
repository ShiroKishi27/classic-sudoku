import { useState, useEffect, useRef, useCallback } from "react";
import "./App.css";
import Grid from "./components/Grid";
import Controls from "./components/Controls";
import { fetchBoard } from "./fetchBoard";
import Loading from "./components/Loading";
import GameStatus from "./components/GameStatus";
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
  const [numberCounts, setNumberCounts] = useState(null);
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

    if (!board || !solution) return;

    let newCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };

    board.forEach((row, r) => {
      row.forEach((cell, c) => {
        if (cell.value !== null && cell.value === solution[r][c]) {
          newCounts[cell.value] += 1;
        }
      });
    });

    setNumberCounts(newCounts);
  }, [board, solution]);

  const handleInput = (row, col, value) => {
    const digit = parseInt(value.slice(-1), 10);
    if (isNaN(digit) || digit < 1 || digit > 9) return;
    if (digit && numberCounts[digit] === 9) return;

    setBoard((prevBoard) => {
      // Deep copy of board
      let newBoard = prevBoard.map((r) =>
        r.map((c) => ({ ...c, notes: [...c.notes] })),
      );

      const cell = newBoard[row][col];

      if (isPencilMode) {
        // Pencil Mode — toggle note
        const alreadyNoted = cell.notes.includes(digit);
        cell.notes = alreadyNoted
          ? cell.notes.filter((n) => n !== digit)
          : [...cell.notes, digit].sort((a, b) => a - b);
      } else {
        // Normal Mode — fill value and clear notes
        const newValue = cell.value === digit ? null : digit;
        cell.value = newValue;
        cell.notes = [];

        // Auto Note Cleanup only if a number is placed (not cleared)
        if (newValue) {
          const boxRow = Math.floor(row / 3) * 3;
          const boxCol = Math.floor(col / 3) * 3;

          for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
              const inSameRow = r === row;
              const inSameCol = c === col;
              const inSameBox =
                Math.floor(r / 3) === Math.floor(row / 3) &&
                Math.floor(c / 3) === Math.floor(col / 3);

              if (inSameRow || inSameCol || inSameBox) {
                newBoard[r][c].notes = newBoard[r][c].notes.filter(
                  (n) => n !== newValue,
                );
              }
            }
          }
        }
      }

      return newBoard;
    });
  };

  const handleMistake = () => {
    let total = 0;
    setMistakeCount((prev) => {
      total = prev + 1;
      if (total >= 5) {
        setStatus("💀 Game Over!! You failed...");
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
          if (cell.value !== null && cell.value !== solution[r][c]) {
            newConflicts.add(`${r}-${c}-${cell.value}`); // store "r-c" as unique key
            if (!conflicts.has(`${r}-${c}-${cell.value}`)) {
              handleMistake();
            }
          }
        });
      });
      const isSolved =
        newConflicts.size === 0 &&
        board.flat().every((cell) => cell.value !== null);
      if (isSolved) setStatus("🎉 Congratulations! You solved it!");

      setConflicts(newConflicts);
    },
    [solution, conflicts],
  );

  const handleReset = () => {
    setBoard(
      puzzle.map((row) =>
        row.map((cell) => ({
          value: cell,
          notes: [],
        })),
      ),
    );
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
        row.map((cell, c) =>
          r === row_idx && c === col_idx ? { value: null, notes: [] } : cell,
        ),
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
    setIsPencilMode(false);
  };

  return (
    <>
      <h1 className="mb-5 text-center text-2xl font-semibold md:text-3xl md:font-bold">
        Classic Sudoku
      </h1>
      <div className="flex flex-col items-center justify-center md:flex-row">
        {!board ? (
          <Loading error={error} />
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
              numberCounts={numberCounts}
            />
          </>
        )}
        {status && (
          <GameStatus
            status={status}
            handleNewGame={handleNewGame}
            handleReset={handleReset}
          />
        )}
      </div>
    </>
  );
};

export default App;
