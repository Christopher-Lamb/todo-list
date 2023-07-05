import React, { useContext } from "react";
import { Droppable } from "react-beautiful-dnd";
import Task from "./Task";

export default function Column({ id, tasks = [], onDelete = () => {}, onChange = () => {}, onCompleted = () => {} }) {
  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps} data-testid={id}>
          {tasks.map((task, i) => (
            <Task key={task.id} index={i} completed={task.completed} {...task} onChange={onChange} onDelete={onDelete} onCompleted={onCompleted} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
