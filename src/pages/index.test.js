import React from "react";
import { render, screen, within, fireEvent } from "@testing-library/react";
import TodoListPage from "./index.jsx";

const TASKS = {
  "task-1": { id: "task-1", content: "TASK-1", completed: false },
  "task-2": { id: "task-2", content: "TASK-2", completed: false },
  "task-3": { id: "task-3", content: "TASK-3", completed: false },
};
const TASKIDS = ["task-1", "task-2", "task-3"];

const verifyTaskOrderInColumn = (columnTestId, orderedTasks) => {
  const texts = within(screen.getByTestId(columnTestId))
    .getAllByTestId("task")
    .map((x) => x.textContent);
  console.log("DOM", texts, "\nExpected", orderedTasks);
  expect(texts).toEqual(orderedTasks);
};

const renderApp = () => {
  const Component = render(<TodoListPage initalTasks={TASKS} initialTaskIds={TASKIDS} />);
  return Component;
};

describe("App", () => {
  // describe("dnd", () => {
  //   beforeEach(() => {
  //     // Run this before each test in the "Buttons" describe block
  //     jest.resetModules();
  //   });
  //   test("moves a task up inside a column", async () => {
  //     const { getAllByTestId, getByTestId } = renderApp();
  //     const tasks = within(getByTestId("todo-col")).getAllByTestId("task");
  //     const task3 = tasks[2];

  //     // Focus the task
  //     task3.focus();

  //     // Simulate pressing the space bar to grab the element
  //     fireEvent.keyDown(document.activeElement, { key: " ", code: "Space" });

  //     // Simulate pressing the arrow up key to move the element up
  //     fireEvent.keyDown(document.activeElement, { key: "ArrowUp", code: "ArrowUp" });

  //     // Simulate releasing the space bar to drop the element
  //     fireEvent.keyDown(document.activeElement, { key: " ", code: "Space" });

  //     const arr = getAllByTestId("task").map((task) => task.id);
  //     console.log("ARRRR", arr);

  //     verifyTaskOrderInColumn("todo-col", ["TASK-1", "TASK-3", "TASK-2"]);
  //   });
  // });
  describe("Buttons", () => {
    test("Add Task", () => {
      const { getByText, getByTestId } = renderApp();
      const AddTaskBtn = getByText("Add Task");
      fireEvent.click(AddTaskBtn);
      const texts = within(getByTestId("todo-col")).getAllByTestId("task");
      expect(texts.length).toEqual(4);
    });
    test("Delete All", () => {
      const { getByText, queryByTestId } = renderApp();
      const ClearAllBtn = getByText("Clear All");
      fireEvent.click(ClearAllBtn);
      const texts = queryByTestId("task");
      expect(texts).toBeNull();
    });
  });
});
