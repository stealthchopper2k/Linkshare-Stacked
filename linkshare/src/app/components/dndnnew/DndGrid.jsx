import React, { useState, useCallback, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "./SortableItem";
import { Item } from "./Item.tsx";
import { Grid } from "./Grid.tsx";

const GridBox = ({ files, box_id, index }) => {
  const [activeId, setActiveId] = useState(null);
  const [currFiles, setFiles] = useState(files);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragCancel = useCallback(() => {
    setActiveId(null);
  }, []);

  const handleDragStart = (event) => {
    const { active } = event;

    setActiveId(active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setFiles((prevFiles) => {
        const oldPos = prevFiles.findIndex((obj) => obj.file_id === active.id);
        const newPos = prevFiles.findIndex((obj) => obj.file_id === over.id);

        return arrayMove(prevFiles, oldPos, newPos);
      });
    }
    setActiveId(null);
  };

  useEffect(() => {
    console.log(currFiles);
  }, [currFiles]);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <SortableContext
        items={currFiles.map((file) => file.file_id)}
        strategy={rectSortingStrategy}
      >
        <Grid columns={5}>
          {currFiles.map((file) => (
            <SortableItem key={file.file_id} id={file.file_id} />
          ))}
        </Grid>
      </SortableContext>
      <DragOverlay adjustScale style={{ transformOrigin: "0 0 " }}>
        {activeId ? <Item id={activeId} isDragging /> : null}
      </DragOverlay>
    </DndContext>
  );
};

export default GridBox;
