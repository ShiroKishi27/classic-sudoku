import React from "react";

const Loading = ({ error }) => {
  return error ? (
    <div className="flex h-[502px] w-[346px] items-center justify-center rounded-lg bg-[#636363] text-center text-xl font-semibold text-white/80 uppercase md:h-[422px] md:w-[650px] md:text-2xl">
      {error}
    </div>
  ) : (
    <div className="flex h-[502px] w-[346px] items-center justify-center rounded-lg bg-[#636363] text-xl font-semibold text-white/80 md:h-[422px] md:w-[650px] md:text-2xl">
      Grid Loading...
    </div>
  );
};

export default Loading;
