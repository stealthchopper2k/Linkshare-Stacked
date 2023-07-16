"use client";
import React, { useEffect, useState } from "react";
import {
  CollectionFunc,
  Conditions,
  File,
  FilterFunc,
} from "@/ts/interfaces/dashboard";
import { RabbitHole } from "./Rabbithole";
import { Droppable, Draggable } from "react-beautiful-dnd";
import CollectionTag from "./CollectionTag";
import { FilterComponent } from "./FilterDiv";

interface Props {
  files: File[];
  box_id: string;
  index: number;
  collection_name: string;
}

const GridComponent = ({ files, box_id, index, collection_name }: Props) => {
  const [newCollectionName, setNewCollectionName] = useState(collection_name);
  const [file_array, newFiles] = useState<File[]>(files);
  const [filtered_files, setFilteredFiles] = useState<File[]>(files);

  const CollectionInput: CollectionFunc = (event) => {
    console.log(newCollectionName);
    setNewCollectionName(event.target.value);
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

  useEffect(() => {
    console.log(typeof index);
  });

  return (
    <Draggable draggableId={box_id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          className="border-2 border-solid rounded-md border-black mb-5 mt-5 
         box bg-white rounded-lg p-10 shadow-md"
        >
          <CollectionTag
            collection_name={collection_name}
            CollectionInput={CollectionInput}
          />
          <FilterComponent FilterClick={FilterClick} values={keys} />
          <Droppable droppableId={index.toString()} type="gridzone">
            {(provided, snapshot) => (
              <div
                className="flex flex-col"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {filtered_files.map((file, index) => (
                  <Draggable
                    draggableId={file.file_id.toString()}
                    index={index}
                    key={file.file_id.toString()}
                  >
                    {(provided) => (
                      <RabbitHole
                        file={file}
                        index={index}
                        id={box_id}
                        innerRef={provided.innerRef}
                        dragHandleProps={provided.dragHandleProps}
                        draggableProps={provided.draggableProps}
                      ></RabbitHole>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default GridComponent;

// {filtered_files.map((file, index) => (
//   <RabbitHole file={file} index={index} id={file.file_id} />
// ))}

{
  /* <Droppable droppableId={index.toString()} type="file_slot">
{(provided, snapshot) => (
  <div className="grid grid-cols-3" ref={provided.innerRef} {...provided.droppableProps}>
    {filtered_files.map((file, index) => (
      <Draggable draggableId={file.file_id.toString()} index={index}>
        {(provided, snapshot) => (
          <RabbitHole
            file={file}
            index={index}
            id={file.file_id}
            innerRef={provided.innerRef}
            dragHandleProps={{ ...provided.dragHandleProps }}
            draggableProps={{ ...provided.draggableProps }}
          />
        )}
      </Draggable>
    ))}
  </div>
)}
</Droppable> */
}
