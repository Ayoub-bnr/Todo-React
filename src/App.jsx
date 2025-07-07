import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes, Link } from "react-router-dom";
import ListTask from "./ListTask";
import "./index.css";
import { TaskContext } from "./contexts/TaskContext";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const innitTodos = [
  {
    id: uuidv4(),
    title: "read books",
    details: "read for 30mins",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "read books",
    details: "read for 30mins",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "watch movie",
    details: "read for 30mins",
    isCompleted: false,
  },
];
function App() {
  const [todos, setTodos] = useState(innitTodos);
  return (
    <>
      <div className="flex flex-col justify-center h-screen">
        <TaskContext.Provider value={{ todos, setTodos }}>
          <ListTask />
        </TaskContext.Provider>
      </div>
    </>
  );
}

export default App;
