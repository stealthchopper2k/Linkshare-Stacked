"use client"
import React, { useEffect, useState } from "react";
import { sortableKeyboardCoordinates, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import GridBox from "../grid/GridBox";
import CollectionTag from "./CollectionTag";
import { FilterComponent } from "./FilterDiv";
import { CollectionFunc, Conditions, FilterFunc, File } from "@/ts/interfaces/dashboard";
import { getFirstScrollableAncestor } from "@dnd-kit/core/dist/utilities";
import { KeyboardSensor, PointerSensor, useDroppable, useSensor, useSensors } from "@dnd-kit/core";

interface Props { 
  id: string;
  index: number;
  files: File[];
  collection_name: string;
}

//edit mode will

// 1 toggle edit mode
// if edit mode reset files to (file_array)
// any editing will be peristed
// save click will save the new collection name, cruds on files

// cant filter while repositioning (board and files), edit name, background color, multi drag?  - reposition is toggle

export function BoardBox({ id, files, collection_name }: Props) {
  const [newCollectionName, setNewCollectionName] = useState(collection_name);
  const [oldCollectionName, setOldCollectionName] = useState(collection_name);

  const [file_array, setFileArray] = useState(files);
  const [filtered_files, setFilteredFiles] = useState(files);

  const { attributes, listeners, over, active, setNodeRef, transform, transition } =
    useSortable({
      id, data: {
        type:"board",
        children: files
      }
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

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

  const CollectionInput: CollectionFunc = (e) => {
    setNewCollectionName(e.target.value);
  };

  const RevertCollectionInput = () => {
    setNewCollectionName(oldCollectionName);
  }

  const PersistOldCollectionName = () => {
    setOldCollectionName(newCollectionName);
  }
  
  return (
    <div className="my-8 rounded-lg relative w-4/5">
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        <GridBox files={filtered_files} id={id} />
        <FilterComponent FilterClick={FilterClick} condition_keys={keys} />
        <CollectionTag collection_name={newCollectionName} CollectionInput={CollectionInput} RevertCollectionInput={RevertCollectionInput} PersistOldCollectionName={PersistOldCollectionName} />
        </div>
    </div>
  );
}
