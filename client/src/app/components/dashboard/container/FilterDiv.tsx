"use client";
import React, { useEffect, useState, useRef } from "react";
import { Filter } from "@/ts/interfaces/dashboard";
import Image from "next/image";

export const FilterComponent: React.FC<Filter> = ({ FilterClick, condition_keys}) => {
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const defaultDropdown = (e: MouseEvent) => {
    if (dropdownRef.current != null) {
      if (!dropdownRef.current.contains(e.target as Node)) {
        setDropdown(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", defaultDropdown);

    return () => {
      document.removeEventListener("mousedown", defaultDropdown);
    };
  }, []);

  return (
      <div
        className="absolute top-0 right-0 h-10 flex flex-col py-1 px-1 transform hover:scale-105 transition-all duration-300"
        ref={dropdownRef}
      >
        <div className="hs-dropdown">
          <button
            id="hs-dropdown-default"
            type="button"
            onClick={(e: any) => {
              setDropdown(!dropdown);
            }}
            className="py-2 px-2 hs-dropdown-toggle inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 border-black dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
          >
            Actions
            <Image
              src={"/arrow.svg"}
              alt="Arrow"
              className="hs-dropdown-open:rotate-180 w-2.5 h-2.5 text-gray-600"
              width={16}
              height={16}
              fill={false}
            />
          </button>
          <div
            className={`flex flex-col flex-1 transition-all ${
              dropdown ? "h-full" : "h-0 border-0"
            }`}
          >
            {dropdown &&
              condition_keys.map((value, i) => (
                <label className="max-w-fit" key={i}>
                  <input
                    type="radio"
                    id={value}
                    name="filter"
                    value={value}
                    onChange={(e) => {
                      FilterClick(value);
                    }}
                  />
                  {value}
                </label>
              ))}
          </div>
        </div>
      </div>
  );
};
