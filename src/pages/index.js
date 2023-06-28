import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "../components/Column";
import Button from "../components/Button";

const TodoListPage = () => {
  const [tasks, setTasks] = useState({ "task-1": { id: "task-1", content: "Test Task 1" }, "task-2": { id: "task-2", content: "Test Task 2" } });
  const [taskIds, setTaskIds] = useState(["task-1", "task-2"]);
  console.log(tasks["task-1"]);
  const renderTasks = taskIds.map((id) => tasks[id]);
  console.log(renderTasks);

  const onDragEnd = (res) => {
    const { destination, source, draggableId } = res;
    if (Object.is(destination, null)) return;
    const from = source.index;
    const to = destination.index;
    if (to === from) return;

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

  const handleDelete = (delId) => {
    setTaskIds((ids) => ids.filter((id) => id !== delId));
    let newTasks = { ...tasks };
    delete newTasks[delId];
    setTasks(newTasks);
  };

  const handleChange = (changeId, value) => {
    console.log(changeId, value);
    let newTasks = { ...tasks };
    newTasks[changeId] = { ...newTasks[changeId], content: value };
    setTasks(newTasks);
  };

  const handleClear = () => {
    setTasks({});
    setTaskIds([]);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center my-4">
          <h1 className="text-4xl">To do</h1>
          <div>
            <Button onClick={handleAddTask} className="mr-2">
              Add Task
            </Button>
            <Button onClick={handleClear}>Clear All</Button>
          </div>
        </div>
        <Column id="todo" tasks={renderTasks} onDelete={handleDelete} onChange={handleChange} />
      </div>
    </DragDropContext>
  );
};

export default TodoListPage;

export const Head = () => <title>Todo List</title>;
