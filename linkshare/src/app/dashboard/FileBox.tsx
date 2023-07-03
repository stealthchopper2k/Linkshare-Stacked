"use client";
import {
  FileBoxProps,
  File,
  FilterFunc,
  Conditions,
} from "@/ts/interfaces/dashboard";
import { FilterComponent } from "@/app/dashboard/filebox/FilterDiv";
import { useState } from "react";
import Link from "next/link";

export const FileBox: React.FC<FileBoxProps> = ({ files, style }) => {
  const [file_array, newFiles] = useState<File[]>(files);
  const [filtered_files, setFilteredFiles] = useState<File[]>(files);

  const conditions: Conditions = {
    All: (file_array: File[]) => {
      return file_array;
    },
    Recent: (values: File[]) => {
      const current_date = new Date();

      return values.sort(
        (file: File) => current_date.getTime() - file.date.getTime()
      );
    },
    Oldest: (values: File[]) => {
      const current_date = new Date();

      return values.sort(
        (value: File) => current_date.getTime() - value.date.getTime()
      );
    },
  };

  const keys = Object.keys(conditions) as Array<keyof Conditions>;

  const FilterClick: FilterFunc = (isChecked, val) => {
    if (isChecked) {
      const new_array = conditions[val](file_array);
      setFilteredFiles(new_array);
    } else {
      setFilteredFiles(file_array);
    }
  };

  return (
    <div className="border-2 border-solid grid grid-rows-4 grid-flow-col gap-4">
      <FilterComponent FilterClick={FilterClick} values={keys} />
      {filtered_files.map((file) => (
        <div
          className="border-1 border-solid border-white bg-gray-700 flex flex-col box-border h-24 w-24 p-2 border-2"
          key={file.id}
        >
          <h1>{file.name}</h1>
          <Link
            className="border-2 border-indigo-600 border-solid outline-2 mt-auto"
            href="/{file.href}"
          >
            View
          </Link>
        </div>
      ))}
    </div>
  );
};
