"use client";
import { FileBoxProps } from "@/ts/interfaces/dashboard";
import { CSS } from "@dnd-kit/utilities";
import GridBox from "../dndnnew/DndGrid";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { SortableItem } from "./SortableBox";

type Props = {
  boxes: FileBoxProps[];
};

// Adjustable file holder component that can filter based on date
export const Board = ({ boxes }: Props) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={(e) => console.log(e.active.id)}
      onDragEnd={(e) => console.log(e.active.id)}
    >
      <SortableContext items={boxes.map((file) => file.box_id)}>
        {Array.from(boxes).map((box, index) => (
          <SortableItem
            key={box.box_id}
            id={box.box_id}
            files={box.files}
            index={index}
          />
        ))}
      </SortableContext>
    </DndContext>
  );
};
