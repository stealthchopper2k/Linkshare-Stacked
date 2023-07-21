import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import GridBox from "../dndnnew/DndGrid";

export function SortableItem(props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div className="flex flex-col w-400 b-2 border-solid rounded-md border-black">
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        <GridBox
          key={props.index}
          files={props.files}
          box_id={props.id}
          index={props.index}
        />
      </div>
    </div>
  );
}
