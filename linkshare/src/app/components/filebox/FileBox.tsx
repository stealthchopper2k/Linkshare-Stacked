"use client";
import {
  FileBoxProps,
  File,
  FilterFunc,
  Conditions,
  CollectionFunc,
} from "@/ts/interfaces/dashboard";
import { FilterComponent } from "@/app/components/filebox/FilterDiv";
import { useState } from "react";
import { GridComponent } from "./Grid";
import CollectionTag from "./CollectionTag";

// Adjustable file holder component that can filter based on date
export const FileBox: React.FC<FileBoxProps> = ({
  files,
  style,
  collection_name,
}) => {
  const [file_array, newFiles] = useState<File[]>(files);
  const [filtered_files, setFilteredFiles] = useState<File[]>(files);
  const [newCollectionName, setNewCollectionName] = useState(collection_name);

  const conditions: Conditions = {
    All: (values: File[]) => {
      // original files
      return [...values];
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
    let new_array: File[];
    if (val == "All") {
      new_array = conditions[val](file_array);
    } else {
      new_array = conditions[val](filtered_files);
    }
    console.log(new_array);
    setFilteredFiles(new_array);
  };

  const CollectionInput: CollectionFunc = (event) => {
    console.log(newCollectionName);
    setNewCollectionName(event.target.value);
  };

  return (
    <div
      className="flex justify-between border-2 border-solid rounded-md border-black mb-5 mt-5 
      box bg-white rounded-lg p-4 shadow-md
    "
    >
      <CollectionTag
        collection_name={newCollectionName}
        CollectionInput={CollectionInput}
      />
      <GridComponent filtered_files={filtered_files} />
      <FilterComponent FilterClick={FilterClick} values={keys} />
    </div>
  );
};
