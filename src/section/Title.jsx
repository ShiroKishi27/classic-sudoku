import React from "react";
import ThemeControl from "../components/ThemeControl";

const Title = () => {
  return (
    <h1 className="mb-5 flex items-center justify-center text-2xl font-semibold md:text-3xl md:font-bold">
      Classic Sudoku <ThemeControl />
    </h1>
  );
};

export default Title;
