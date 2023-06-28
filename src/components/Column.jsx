import React from "react";
import { Droppable } from "react-beautiful-dnd";
import Task from "./Task";

export default function Column({ id, tasks = [] }) {
  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <div className="bg-zinc-600" ref={provided.innerRef} {...provided.droppableProps}>
          {tasks.map((task, i) => (
            <Task key={task.id} index={i} {...task} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
