"use client";
import {
  DndContext,
  DragCancelEvent,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { BoardBox } from "./BoardBox";
import { useState } from "react";
import { Container } from "@/ts/interfaces/dashboard";
import GridBox from "../grid/GridBox";

interface Props {
  container: Container; 
}

// Adjustable file holder component that can filter based on date
export const Board = ( {container} : Props) => {
  const [currBoxes, setBoxes] = useState(container);
  const [clonedBoxes, setClonedBoxes] = useState<Container | null>(container);
  const [edit, setEdit] = useState(true);

  const [keyContainers, setContainers] = useState(Object.keys(currBoxes) as UniqueIdentifier[]);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

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

  const toggleEdit = () => {
    setEdit(!edit);
  }

  const findContainer = (id: any): UniqueIdentifier => {
    if (id in currBoxes) {
      return id;
    }
  
    return Object.keys(currBoxes).find((key) => currBoxes[key].files.find(item => item.client_id.includes(id))) as string;
  }
  
  return (
    <DndContext
      sensors={sensors}
      onDragStart={(event: DragStartEvent) => { 
        const { active } = event;

        console.log(active.id)
        setActiveId(active?.id);
        setClonedBoxes(currBoxes);
      }}
      onDragCancel={(event: DragCancelEvent) => {
        if (clonedBoxes) {
          setBoxes(clonedBoxes);
        }
    
        setActiveId(null);
        setClonedBoxes(null);
      }}
      onDragOver={({active, over}) => {
        const overId = over?.id;

        if (overId == null || active.id in currBoxes) {
          return;
        }

        const overContainer = findContainer(overId);
        const activeContainer = findContainer(active.id);

        if (!overContainer || !activeContainer) {
          return;
        }

        if (activeContainer !== overContainer) {
          setBoxes((currBoxes) => {
            const activecurrBoxes = currBoxes[activeContainer];
            const overcurrBoxes = currBoxes[overContainer];

            const activeIndex = activecurrBoxes.files.findIndex((item) => item.client_id === active.id);
            const overIndex = overcurrBoxes.files.findIndex((item) => item.client_id === over?.id);

            let newIndex: number;

            if (overId in currBoxes) {
              newIndex = overcurrBoxes.length + 1;
            } else {
              const isBelowOverItem =
                over &&
                active.rect.current.translated &&
                active.rect.current.translated.top >
                  over.rect.top + over.rect.height;

              const modifier = isBelowOverItem ? 1 : 0;

              newIndex =
                overIndex >= 0 ? overIndex + modifier : overcurrBoxes.length + 1;
            }

            return {
              ...currBoxes,
              [activeContainer]: {
                ...currBoxes[activeContainer],
                files: currBoxes[activeContainer].files.filter(
                  (item) => item.client_id !== active.id
                )
              },
              [overContainer]: { ...currBoxes[overContainer], files: [
                ...currBoxes[overContainer].files.slice(0, newIndex),
                currBoxes[activeContainer].files[activeIndex],
                ...currBoxes[overContainer].files.slice(
                  newIndex,
                  currBoxes[overContainer].files.length
                ),
              ]},
            };
          });
        }
      }}
      onDragEnd={({active, over}) => {
        if (active.id in currBoxes && over?.id) {
          setContainers((containers) => {
            const activeIndex = containers.indexOf(active.id);
            const overIndex = containers.indexOf(over.id);

            return arrayMove(containers, activeIndex, overIndex);
          });
        }

        const activeContainer = findContainer(active.id);

        if (!activeContainer) {
          setActiveId(null);
          return;
        }

        const overId = over?.id;

        if (overId == null) {
          setActiveId(null);
          return;
        }

        const overContainer = findContainer(overId);

        if (overContainer) {
          const activeIndex = currBoxes[activeContainer].files.findIndex(item => item.client_id === active.id);
          const overIndex = currBoxes[overContainer].files.findIndex(item => item.client_id === over?.id);

          if (activeIndex !== overIndex) {
            setBoxes((currBoxes) => ({
              ...currBoxes,
              [overContainer]: {
                ...currBoxes[overContainer],
                files: arrayMove(
                  currBoxes[overContainer].files,
                  activeIndex,
                  overIndex
                ),
              },
            }));
            console.log(currBoxes)
          }
        }

        setActiveId(null);
      }}
    >
      
      <SortableContext items={[...keyContainers]} strategy={verticalListSortingStrategy}>
        {keyContainers.map((key, index) => (
          <BoardBox key={key} id={key} index={index} collection_name={currBoxes[key].collection_name} files={currBoxes[key].files} editmode={edit}>
            <SortableContext
              items={currBoxes[key].files.map((file) => file.client_id)}
              strategy={rectSortingStrategy}>
              <GridBox files={currBoxes[key].files} collection_name={currBoxes[key].collection_name} editmode={edit}/>
              </SortableContext>
          </BoardBox>
        ))}
      </SortableContext>
      </DndContext>
  );
};

  // const getIndex = (id: any): number => {
  //   const box = findContainer(id);

  //   if (!box) {
  //     return -1;
  //   }

  //   const index = currBoxes[box].files.findIndex((item) => item.client_id === id);
  //   return index;
  // };
  

// const handleRemove = (containerId: UniqueIdentifier): void => {
//   setContainers((keyContainers) => keyContainers.filter((id) => id !== containerId));
//   setBoxes((currBoxes) => {
//     const newcurrBoxes = { ...currBoxes };
//     delete newcurrBoxes[containerId];
//     return newcurrBoxes;
//   });
// };

// const handleRemoveItem = (id: string): void => { 
//   const index = getIndex(id);
//   const box = findContainer(id);

//   setBoxes((currBoxes) => {
//     const newcurrBoxes = { ...currBoxes };
//     newcurrBoxes[box].files.splice(index, 1);
//     return newcurrBoxes;
//   })
// };