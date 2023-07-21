import React from "react";

type GridProps = {
  children: React.ReactNode;
  columns: number;
};

export const Grid: React.FC<GridProps> = ({ children, columns }) => {
  return (
    <div className="grid grid-cols-5 gap-10 max-w-400px mx-auto">
      {children}
    </div>
  );
};

export default Grid;
