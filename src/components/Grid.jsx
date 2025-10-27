import React, { memo } from "react";
import clsx from "clsx";

const Cell = React.memo(function Cell({
  cell,
  row,
  col,
  isPrefilled,
  conflicts,
  isSameValue,
  inSameRow,
  inSameCol,
  inSameBox,
  isSelected,
  onFocus,
  onKeyDown,
}) {
  const borderClasses = clsx(
    "border border-gray-400",
    row % 3 === 0 && "border-t-2 border-t-black",
    col % 3 === 0 && "border-l-2 border-l-black",
    row === 8 && "border-b-2 border-b-black",
    col === 8 && "border-r-2 border-r-black",
  );

  return (
    <div
      tabIndex={0}
      onFocus={onFocus}
      onKeyDown={onKeyDown}
      className={clsx(
        "relative flex aspect-square cursor-default items-center justify-center text-center text-xl transition-colors outline-none select-none md:text-3xl",
        borderClasses,
        // ✅ Same highlight logic from your table version:
        (inSameRow || inSameCol || inSameBox) && "bg-blue-200/70",
        isSameValue && cell.value !== null && "bg-blue-400/50",
        isSelected && "bg-blue-500/70",
        conflicts.has(`${row}-${col}-${cell.value}`)
          ? "bg-red-300 text-red-500"
          : isPrefilled
            ? "text-gray-800"
            : "text-blue-700",
      )}
    >
      {cell.value ? (
        <span>{cell.value}</span>
      ) : cell.notes?.length ? (
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 text-[10px] text-gray-500 md:text-xs">
          {Array.from({ length: 9 }, (_, i) => (
            <span key={i} className="flex items-center justify-center">
              {cell.notes.includes(i + 1) ? i + 1 : ""}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
});

const Grid = ({
  board,
  puzzle,
  selected,
  setSelected,
  handleInput,
  conflicts,
}) => {
  // 🟦 Get value of the currently selected cell (for same-number highlighting)
  const selectedValue =
    selected && board?.[selected[0]]?.[selected[1]]?.value !== null
      ? board[selected[0]][selected[1]].value
      : null;

  return (
    <div className="mx-auto w-fit rounded-lg bg-white p-3.5 shadow">
      <div className="grid grid-cols-9 grid-rows-9">
        {board.map((row, r) =>
          row.map((cell, c) => {
            const isPrefilled = puzzle[r][c] !== null;

            // 🟨 Highlight same number if selected cell has value
            const isSameValue =
              selectedValue !== null && cell.value === selectedValue;

            const isSelected =
              selected && selected[0] === r && selected[1] === c;

            const inSameRow = selected && selected[0] === r;
            const inSameCol = selected && selected[1] === c;
            const inSameBox =
              selected &&
              Math.floor(selected[0] / 3) === Math.floor(r / 3) &&
              Math.floor(selected[1] / 3) === Math.floor(c / 3);

            return (
              <Cell
                key={`cell-${r}-${c}`}
                cell={cell}
                row={r}
                col={c}
                isPrefilled={isPrefilled}
                conflicts={conflicts}
                selected={selected}
                onFocus={() => setSelected([r, c])}
                onKeyDown={(e) => {
                  if (isPrefilled) return;
                  if (/^[1-9]$/.test(e.key)) {
                    e.preventDefault();
                    handleInput(r, c, e.key);
                  } else if (["Backspace", "Delete"].includes(e.key)) {
                    e.preventDefault();
                    handleInput(r, c, null);
                  }
                }}
                // ✅ Extra props for highlighting
                isSameValue={isSameValue}
                inSameRow={inSameRow}
                inSameCol={inSameCol}
                inSameBox={inSameBox}
                isSelected={isSelected}
              />
            );
          }),
        )}
      </div>
    </div>
  );
};

export default Grid;
