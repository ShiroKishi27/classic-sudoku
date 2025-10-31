import React, { useEffect, useRef, useCallback } from "react";
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
  const ref = useRef(null);
  const borderClasses = clsx(
    "border-grid-lines",
    row % 3 === 0
      ? "border-t-2 border-t-clues"
      : "border-t border-t-grid-lines",
    col % 3 === 0
      ? "border-l-2 border-l-clues"
      : "border-l border-l-grid-lines",
    row === 8 && "border-b-2 border-b-clues",
    col === 8 && "border-r-2 border-r-clues",
  );

  useEffect(() => {
    if (isSelected && ref.current) {
      ref.current.focus();
    }
  }, [isSelected]);

  return (
    <div
      ref={ref}
      tabIndex={0}
      onFocus={onFocus}
      onKeyDown={onKeyDown}
      className={clsx(
        "relative flex aspect-square cursor-default items-center justify-center text-center text-xl transition-colors outline-none select-none md:text-3xl",
        borderClasses,
        // highlight logic same box, same column, same row, and same cell value
        // highlight logic conflicts

        isSelected
          ? "bg-highlight"
          : (inSameRow || inSameCol || inSameBox) && "bg-highlight-secondary",
        isSameValue && cell.value !== null && "bg-highlight",
        conflicts.has(`${row}-${col}-${cell.value}`)
          ? "bg-mistake-secondary text-mistake-primary"
          : isPrefilled
            ? "text-clues"
            : "text-entry",
      )}
    >
      {cell.value ? (
        <span>{cell.value}</span>
      ) : cell.notes?.length ? (
        <div className="text-grid-lines absolute inset-0 grid grid-cols-3 grid-rows-3 text-[10px] md:text-xs">
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
  handleArrowKey,
  handleErase,
  status,
}) => {
  // Get value of the currently selected cell (for same-number highlighting)
  const selectedValue =
    selected && board?.[selected[0]]?.[selected[1]]?.value !== null
      ? board[selected[0]][selected[1]].value
      : null;

  const handleFocus = useCallback(
    (r, c) => {
      setSelected([r, c]);
    },
    [setSelected],
  );

  return (
    <div className="bg-grid-btn mx-auto w-fit rounded-lg p-3.5">
      <div className="grid grid-cols-9 grid-rows-9">
        {board.map((row, r) =>
          row.map((cell, c) => {
            const isPrefilled = puzzle[r][c] !== null;

            // Highlight same number if selected cell has value
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
                onFocus={() => handleFocus(r, c)}
                onKeyDown={(e) => {
                  if (status) return;
                  // if (isPrefilled) return;
                  if (!isPrefilled && /^[1-9]$/.test(e.key)) {
                    e.preventDefault();
                    handleInput(r, c, e.key);
                  } else if (["Backspace", "Delete"].includes(e.key)) {
                    e.preventDefault();
                    handleErase();
                  } else if (
                    [
                      "ArrowUp",
                      "ArrowDown",
                      "ArrowLeft",
                      "ArrowRight",
                    ].includes(e.key)
                  ) {
                    e.preventDefault();
                    handleArrowKey(e.key);
                  } else if (selected && e.key === "Escape") {
                    e.preventDefault();
                    e.target.blur();
                    setSelected(null);
                  }
                }}
                // Extra props for highlighting
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
