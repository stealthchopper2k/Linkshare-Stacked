import React from "react";

type GridProps = {
  children: React.ReactNode;
  columns: number;
};

export const GridParent: React.FC<GridProps> = ({ children, columns }) => {
  return (
    <div className="grid grid-cols-5 gap-10 border-solid border-2 border-black rounded-md p-4">
      {children}
    </div>
  );
};

export default GridParent;
