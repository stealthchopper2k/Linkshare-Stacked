import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { File } from "@/ts/interfaces/dashboard"
import { DragOverlay, UniqueIdentifier } from "@dnd-kit/core";
import { CSSProperties, useEffect } from "react";

interface Props {
  file: File;
  editmode: boolean;
}

export const SortableItem = ({ file, editmode }: Props) => {
  const {
    isDragging,
    attributes,
    listeners,
    setNodeRef,
    active,
    transform,
    transition,
  } = useSortable({ id: file.client_id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition: transition || undefined,
  };

  const inlineStyles: CSSProperties = {
    transformOrigin: "50% 50%",
    cursor: isDragging ? "grabbing" : "grab",
    backgroundColor: "#ffffff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: isDragging
      ? "rgb(63 63 68 / 5%) 0px 2px 0px 2px, rgb(34 33 81 / 15%) 0px 2px 5px 2px"
      : "rgb(63 63 68 / 5%) 0px 0px 0px 1px, rgb(34 33 81 / 15%) 0px 1px 5px 0px",
    ...style,
  };

  useEffect(() => {
    console.log(file)
  }, [file])

  return (
    <>
    <div ref={editmode ? setNodeRef: null} {...listeners} {...attributes} style={inlineStyles} className="text-black h-[4rem] w-[6rem]">
      {file.client_id}
      </div>
      </>
  );
};

{/* <DragOverlay> */}
    {/* {activeId ? <SortableItem file={file} /> : null} */}
    {/* </DragOverlay> */}