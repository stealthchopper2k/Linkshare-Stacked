import { DraggableChildrenFn, DraggableId } from "react-beautiful-dnd";

type Props = {
  // required
  draggableId: DraggableId;
  index: number;
  children: DraggableChildrenFn;
  // optional
  isDragDisabled: boolean | null | undefined;
  disableInteractiveElementBlocking: boolean | null | undefined;
  shouldRespectForcePress: boolean | null | undefined;
};
