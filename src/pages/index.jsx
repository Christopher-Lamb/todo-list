import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "../components/Column";
import Button from "../components/Button";
import DarkModeProvider, { useDarkMode } from "../context/DarkModeContext";

const TASKS = {
  "task-1": { id: "task-1", content: "TASK-1", completed: false },
  "task-2": { id: "task-2", content: "TASK-2", completed: false },
  "task-3": { id: "task-3", content: "TASK-3", completed: false },
};
const TASKIDS = ["task-1", "task-2", "task-3"];

const TodoListPage = ({ initalTasks = { ...TASKS }, initialTaskIds = [...TASKIDS] }) => {
  const [tasks, setTasks] = useState({ ...initalTasks });
  const [taskIds, setTaskIds] = useState([...initialTaskIds]);
  const [darkMode, setDarkMode] = useState(false);
  const renderTasks = taskIds.map((id) => tasks[id]);

  useEffect(() => {
    let storedTodos = localStorage.getItem("todos");
    if (Object.is(storedTodos, null)) {
      // storedTodos = { tasks: { demo: { id: "demo", content: " - Demo Task", completed: false } }, taskIds: ["demo"] };
      storedTodos = { tasks: { ...TASKS }, taskIds: [...TASKIDS] };
      localStorage.setItem("todos", JSON.stringify(storedTodos));
    } else {
      storedTodos = JSON.parse(storedTodos);
    }
    // storedTodos = storedTodos;
    setTaskIds(storedTodos["taskIds"]);
    setTasks(storedTodos["tasks"]);
  }, []);

  const localStorageSave = (tasks, taskIds) => {
    localStorage.setItem("todos", JSON.stringify({ tasks, taskIds }));
  };

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
    localStorageSave(tasks, newTaskIds);

    // console.log(res);
  };

  const handleAddTask = () => {
    const newId = (Date.now() + Math.random()).toString();

    setTasks((t) => ({ ...t, [newId]: { id: newId, content: "", completed: false } }));
    setTaskIds((ids) => [...ids, newId]);
  };

  const handleDelete = (delId) => {
    const newTaskIds = taskIds.filter((id) => id !== delId);
    setTaskIds(newTaskIds);
    let newTasks = { ...tasks };
    delete newTasks[delId];
    setTasks(newTasks);
    localStorageSave(newTasks, newTaskIds);
  };

  const handleChange = (changeId, value) => {
    let newTasks = { ...tasks };
    newTasks[changeId] = { ...newTasks[changeId], content: value };
    setTasks(newTasks);
    localStorageSave(newTasks, taskIds);
  };

  const handleClear = () => {
    setTasks({});
    setTaskIds([]);
    localStorageSave({}, []);
  };

  const handleDarkModeSwitch = () => {
    setDarkMode((dm) => !dm);
    if (!darkMode) window.document.children[0].style.background = "#111827";
    if (darkMode) window.document.children[0].style.background = "#d1d5db";
  };

  const handleCompleted = (compId, isComplete) => {
    let newTasks = { ...tasks };
    newTasks[compId].completed = isComplete;
    setTasks(newTasks);
    localStorageSave(newTasks, taskIds);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd} enableDefaultSensors={true}>
      <DarkModeProvider value={darkMode}>
        <div className="max-w-3xl mx-auto mt-32 px-8 lg:p-0">
          <div className="flex justify-between md:items-center my-4 gap-3 md:gap-0 flex-col sm:flex-row mb-5">
            <Header>To do</Header>
            <div className="flex">
              <Button style={darkMode ? { color: "black", background: "rgb(244,242,243)" } : { color: "white", background: "rgb(41,42,43)" }} onClick={handleAddTask} className="mr-2">
                Add Task
              </Button>
              <Button style={darkMode ? { color: "black", background: "rgb(244,242,243)" } : { color: "white", background: "rgb(41,42,43)" }} className="mr-2" onClick={handleClear}>
                Clear All
              </Button>
              <Button style={darkMode ? { color: "black", background: "rgb(244,242,243)" } : { color: "white", background: "rgb(41,42,43)" }} onClick={handleDarkModeSwitch}>
                Dark Mode
              </Button>
            </div>
          </div>
          <Column id="todo-col" tasks={renderTasks} onDelete={handleDelete} onChange={handleChange} onCompleted={handleCompleted} />
        </div>
        {/* <div className="absolute hidden">
          <p>You have lifted an item t</p>
          <p>You have moved the item</p>
          <p>You have dropped the item</p>
        </div> */}
      </DarkModeProvider>
    </DragDropContext>
  );
};

export default TodoListPage;

// export { onDragEnd };

export const Head = () => <title>Todo List</title>;

const HeaderStyle = (darkMode) => ({
  background: darkMode ? "#4b5563" : "white",
  color: darkMode ? "white" : "black",
  boxShadow: darkMode ? "" : "-7px 7px 0px -1px rgba(0,0,0,0.75)",
  borderRadius: darkMode ? "0.25rem" : "",
  outline: darkMode ? "1px solid #9ca3af" : "",
  padding: "0.5rem 1rem",
});

const Header = ({ children }) => {
  const darkMode = useDarkMode();

  return (
    <h1 data-testid="todo-header" className="text-4xl w-32 text-center" style={HeaderStyle(darkMode)}>
      {children}
    </h1>
  );
};
