import Link from "next/link";
import { File } from "@/ts/interfaces/dashboard";
import {
  DraggableProvidedDragHandleProps,
  DraggableProvidedDraggableProps,
} from "react-beautiful-dnd";

interface RabbitHoleProps {
  file: File;
  index: number;
  id: string | number;
  innerRef: (element: HTMLElement | null) => void;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
  draggableProps: DraggableProvidedDraggableProps;
}

export const RabbitHole: React.FC<RabbitHoleProps> = ({
  file,
  index,
  id,
  innerRef,
  dragHandleProps,
  draggableProps,
}) => {
  return (
    <div {...draggableProps} {...dragHandleProps} ref={innerRef}>
      <Link className="text-white" href={file.url}>
        <div className="transform hover:scale-105 transition-all duration-300 border-2 border-black rounded-full border-black bg-gray-900 flex flex-col box-border aspect-w-1 aspect-h-1 h-[4rem] w-[4rem] p-2 md:h-[5.5rem] sm:w-[5rem] md:w-[5.5rem] justify-center items-center text-center">
          <h1 className="justify-self-center">{file.name}</h1>
        </div>
      </Link>
    </div>
  );
};
