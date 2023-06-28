import React from "react";
import { Draggable } from "react-beautiful-dnd";

export default function Task({ id, content, index }) {
  return (
    <Draggable index={index} draggableId={id}>
      {(provided) => (
        <div className="border border-white min-h-[1.5rem]" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          {content}
        </div>
      )}
    </Draggable>
  );
}
