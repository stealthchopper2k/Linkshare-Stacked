"use client";
import { FileBoxProps } from "@/ts/interfaces/dashboard";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import GridComponent from "./GridComponent";

type Props = {
  boxes: FileBoxProps[];
};

// Adjustable file holder component that can filter based on date
export const Board = ({ boxes }: Props) => {
  return (
    <DragDropContext
      onDragEnd={(result) => console.log(result)}
      onDragStart={(t) => console.log(t)}
    >
      <Droppable droppableId="board" direction="vertical" type="column">
        {(provided, snapshot) => (
          <div
            className="min-h-screen flex flex-col w-full h-full mx-auto"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {Array.from(boxes).map((box, index) => (
              <GridComponent
                key={box.box_id}
                files={box.files}
                box_id={box.box_id}
                index={index}
                collection_name={box.collection_name}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
