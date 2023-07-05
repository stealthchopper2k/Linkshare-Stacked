"use client";
import {
  FileBoxProps,
  File,
  FilterFunc,
  Conditions,
} from "@/ts/interfaces/dashboard";
import { FilterComponent } from "@/app/dashboard/filebox/FilterDiv";
import { useEffect, useState } from "react";
import Link from "next/link";

// Adjustable file holder component that can filter based on date
export const FileBox: React.FC<FileBoxProps> = ({ files, style }) => {
  const [file_array, newFiles] = useState<File[]>(files);
  const [filtered_files, setFilteredFiles] = useState<File[]>(files);

  const conditions: Conditions = {
    All: (file_array: File[]) => {
      // original files
      return file_array;
    },
    Recent: (values: File[]) => {
      const current_date = new Date();

      return [...values].sort(
        (file: File) => current_date.getTime() - new Date(file.date).getTime()
      );
    },
    Oldest: (values: File[]) => {
      const current_date = new Date();

      return [...values].sort(
        (value: File) => current_date.getTime() - new Date(value.date).getTime()
      );
    },
  };

  const keys = Object.keys(conditions) as Array<keyof Conditions>;

  const FilterClick: FilterFunc = (val) => {
    const new_array = conditions[val](filtered_files);
    console.log(new_array);
    setFilteredFiles(new_array);
  };

  return (
    <div className="border-2 border-solid rounded-md border-black grid grid-cols-1 gap-4 p-10 m-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <FilterComponent FilterClick={FilterClick} values={keys} />
      {filtered_files.map((file, i) => (
        <div
          className="border-1 border-solid-black rounded-md border-white bg-gray-700 flex flex-col box-border h-24 w-24 p-2 border-2"
          key={i}
        >
          <h1>{file.name}</h1>
          <Link
            className="border-2 border-indigo-600 border-solid outline-2 mt-auto"
            href={file.url}
          >
            View
          </Link>
        </div>
      ))}
    </div>
  );
};
