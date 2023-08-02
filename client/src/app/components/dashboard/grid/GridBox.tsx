import React, { useEffect, useState } from "react";
import { SortableItem } from "./SortableItem";
import { CollectionFunc, Conditions, File, FilterFunc } from "@/ts/interfaces/dashboard";
import { FilterComponent } from "../container/FilterDiv";
import CollectionTag from "../container/CollectionTag";
import { DragOverlay } from "@dnd-kit/core";

interface Props {
  files: File[];
  collection_name: string;
  editmode: boolean;
}

const GridBox = ({ files, collection_name, editmode }: Props) => {
  const [newCollectionName, setNewCollectionName] = useState(collection_name);
  const [oldCollectionName, setOldCollectionName] = useState(collection_name);

  const [file_array, setFileArray] = useState(files);
  const [filtered_files, setFilteredFiles] = useState(files);
  
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

    setFilteredFiles(new_array);
  };

  const CollectionInput: CollectionFunc = (e) => {
    setNewCollectionName(e.target.value);
  };

  const RevertCollectionInput = () => {
    setNewCollectionName(oldCollectionName);
  }

  const PersistOldCollectionName = () => {
    setOldCollectionName(newCollectionName);
  }
  
  useEffect(() => {
    console.log(files);
  },[files])

  return (
    <div className="my-8 rounded-lg">
        <FilterComponent FilterClick={FilterClick} condition_keys={keys} />
      <CollectionTag collection_name={newCollectionName} CollectionInput={CollectionInput} RevertCollectionInput={RevertCollectionInput} PersistOldCollectionName={PersistOldCollectionName} editmode={editmode} />
      <div className="grid grid-cols-5 gap-10 border-solid border-2 border-black rounded-md p-4">
      {editmode ? (
  files.map((file) => (
    <div key={file.client_id}>
      <SortableItem file={file} editmode={editmode} />
    </div>
  ))
) : (
  filtered_files.map((file) => (
    <div key={file.client_id}>
      <SortableItem file={file} editmode={editmode} />
    </div>
  ))
)}
      </div>
      </div>
  );
};

export default GridBox;