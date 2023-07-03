import React from "react";
import { Filter } from "@/ts/interfaces/dashboard";

export const FilterComponent: React.FC<Filter> = ({ FilterClick, values }) => {
  return (
    <div className="flex items-center">
      <div className="relative inline-block text-left">
        {values.map((value) => (
          <label>
            <input
              type="checkbox"
              value={value}
              onClick={(e) => {
                let checked = e.currentTarget.checked;
                FilterClick(checked, value);
              }}
            />
            {value}
          </label>
        ))}
      </div>
    </div>
  );
};
