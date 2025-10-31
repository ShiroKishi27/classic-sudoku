import React from "react";

const Loading = ({ error }) => {
  return error ? (
    <div className="bg-foreground text-new-game-secondary/80 flex h-[502px] w-[346px] items-center justify-center rounded-lg text-center text-xl font-semibold uppercase md:h-[422px] md:w-[650px] md:text-2xl">
      {error}
    </div>
  ) : (
    <div className="bg-foreground text-new-game-secondary/80 flex h-[502px] w-[346px] items-center justify-center rounded-lg text-xl font-semibold md:h-[422px] md:w-[650px] md:text-2xl">
      Grid Loading...
    </div>
  );
};

export default Loading;
