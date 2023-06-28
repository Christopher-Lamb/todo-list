import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "../components/Column";
import Button from "../components/Button";

const starterTask = { id: "task-1", content: "Test Task 1" };

const TodoListPage = () => {
  const [tasks, setTasks] = useState({ "task-1": { id: "task-1", content: "Test Task 1" }, "task-2": { id: "task-2", content: "Test Task 2" } });
  const [taskIds, setTaskIds] = useState(["task-1", "task-2"]);
  console.log(tasks["task-1"]);
  const renderTasks = taskIds.map((id) => tasks[id]);
  console.log(renderTasks);

  const onDragEnd = (res) => {
    const { destination, source, draggableId } = res;
    const from = source.index;
    const to = destination.index;

    let newTaskIds = [...taskIds];
    newTaskIds.splice(from, 1);
    newTaskIds.splice(to, 0, draggableId);
    setTaskIds(newTaskIds);

    // console.log(res);
  };

  const handleAddTask = () => {
    const newId = crypto.randomUUID();
    setTasks((t) => ({ ...t, [newId]: { id: newId, content: "" } }));
    setTaskIds((ids) => [...ids, newId]);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center my-4">
          <h1 className="text-4xl">To do</h1>
          <Button onClick={handleAddTask}>Add Task</Button>
        </div>
        <Column id="todo" tasks={renderTasks} />
      </div>
    </DragDropContext>
  );
};

export default TodoListPage;

export const Head = () => <title>Todo List</title>;
