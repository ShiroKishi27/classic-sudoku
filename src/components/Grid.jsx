import clsx from "clsx";

const Grid = ({
  board,
  puzzle,
  selected,
  setSelected,
  handleInput,
  conflicts,
}) => {
  return (
    <div className="rounded-lg bg-white p-3.5">
      <table className="border-collapse">
        <tbody>
          {board.map((row, row_index) => {
            return (
              <tr
                key={row_index}
                className="border border-solid border-gray-400 nth-1:border-t-3 nth-1:border-t-black nth-[3n]:border-b-3 nth-[3n]:border-b-black"
              >
                {row.map((cell, col_index) => {
                  const isPrefilled = puzzle[row_index][col_index] !== null;
                  return (
                    <td
                      key={col_index}
                      className={clsx(
                        "border border-solid border-gray-400 p-0 nth-1:border-l-3 nth-1:border-l-black nth-[3n]:border-r-3 nth-[3n]:border-r-black",
                        selected &&
                          row_index === selected[0] &&
                          "bg-blue-200/70",
                        selected &&
                          col_index === selected[1] &&
                          "bg-blue-200/70",
                        selected &&
                          Math.floor(row_index / 3) ===
                            Math.floor(selected[0] / 3) &&
                          Math.floor(col_index / 3) ===
                            Math.floor(selected[1] / 3) &&
                          "bg-blue-200/70",
                        selected &&
                          board?.[selected?.[0]]?.[selected?.[1]] === cell &&
                          cell !== null &&
                          "bg-blue-400/50",
                      )}
                    >
                      <input
                        type="text"
                        className={clsx(
                          "h-[50px] w-[50px] cursor-default border-none text-center text-2xl outline-none focus:bg-blue-400/50 focus:caret-transparent",
                          conflicts.has(`${row_index}-${col_index}`)
                            ? "bg-red-300 text-red-500"
                            : isPrefilled
                              ? "text-gray-800"
                              : "text-blue-700",
                        )}
                        maxLength={1}
                        value={cell === null ? "" : cell}
                        readOnly={isPrefilled}
                        onFocus={() => {
                          setSelected([row_index, col_index]);
                        }}
                        onClick={() => {
                          setSelected([row_index, col_index]);
                        }}
                        onChange={(e) => {
                          handleInput(row_index, col_index, e.target.value);
                        }}
                      />
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Grid;
