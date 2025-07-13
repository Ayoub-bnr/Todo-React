import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes, Link } from "react-router-dom";
import ListTask from "./ListTask";
import "./index.css";
import { TaskContext } from "./contexts/TaskContext";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Snackbar from "@mui/material/Snackbar";
import MySnackBar from "./MySnackBar";
import { ToastContext } from "./contexts/ToastContext";
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
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  function showHideToast(message) {
    setOpen(true);
    setMessage(message);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  }
  return (
    <>
      <ToastContext.Provider value={{ showHideToast }}>
        <div className="flex flex-col justify-center h-screen">
          <MySnackBar open={open} message={message} />
          <TaskContext.Provider value={{ todos, setTodos }}>
            <ListTask />
          </TaskContext.Provider>
        </div>
      </ToastContext.Provider>
    </>
  );
}

export default App;
