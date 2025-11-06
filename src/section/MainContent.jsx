import React from "react";

const MainContent = ({ children }) => {
  return (
    <div className="flex flex-col items-center justify-center md:flex-row">
      {children}
    </div>
  );
};

export default MainContent;
