const SUDOKU_API =
  "https://sudoku-api.vercel.app/api/dosuku?query={newboard(limit:1){grids{value,solution,difficulty}}}";
export const fetchBoard = async ({
  setError,
  setStatus,
  setPuzzle,
  setSolution,
  setBoard,
  setSelected,
  setDifficulty,
}) => {
  setError("");
  setStatus("");

  try {
    const res = await fetch(SUDOKU_API);
    const data = await res.json();

    const grid = data.newboard.grids[0];
    const puzzle = grid.value.map((row) =>
      row.map((cell) => (cell === 0 ? null : cell)),
    );
    const solution = grid.solution.map((row) =>
      row.map((cell) => (cell === 0 ? null : cell)),
    );
    const difficulty = grid.difficulty;

    setDifficulty(difficulty);
    setPuzzle(puzzle);
    setSolution(solution);
    setBoard(puzzle.map((row) => [...row]));
    console.log(puzzle);
    console.log(solution);
    setSelected(null);
  } catch (e) {
    setError("Failed to fetch sudoku puzzle.", e);
  }
};
