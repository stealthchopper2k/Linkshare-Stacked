"use client";
import { FileBoxProps } from "@/ts/interfaces/dashboard";
import {
  DndContext,
  DragCancelEvent,
  DragEndEvent,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { BoardBox } from "./BoardBox";
import { useState } from "react";

type Props = {
  boxes: FileBoxProps[];
};

// Adjustable file holder component that can filter based on date
export const Board = ({ boxes }: Props) => {
  const [currBoxes, setBoxes] = useState(boxes);
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
      onActivation: (event) => { 
        console.log(event)
      }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const DragStart = (event: DragStartEvent) => { 
    const { active } = event;


    setActiveId(active?.id);
  }

  const DragCancel = (event: DragCancelEvent) => {
    setActiveId(null);
  }

  const DragEnd = (event : DragEndEvent) => {
    const { active, over } = event;
    
    if (active.id !== over.id) {
      setBoxes((prevBoxes) => {
        const oldPos = prevBoxes.findIndex((obj) => obj.box_id === active.id);
        const newPos = prevBoxes.findIndex((obj) => obj.box_id === over.id);

        return arrayMove(prevBoxes, oldPos, newPos);
      })
    }
    
    setActiveId(null)
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={(e) => DragStart(e)}
      onDragEnd={(e) => DragEnd(e)}
      onDragCancel={(e) => DragCancel(e)}
    >
      <SortableContext items={currBoxes.map((file) => file.box_id)}>
        {Array.from(currBoxes).map((box, index) => (
          <BoardBox
            key={box.box_id}
            id={box.box_id}
            files={box.files}
            index={index}
            collection_name={box.collection_name}
          />
        ))}
      </SortableContext>
      </DndContext>
  );
};
