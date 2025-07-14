import "./App.css";

import ListTask from "./ListTask";
import "./index.css";
import TodosProvider from "./contexts/TaskContext";
import { ToastProvider } from "./contexts/ToastContext";
//   {
//     id: uuidv4(),
//     title: "read books",
//     details: "read for 30mins",
//     isCompleted: false,
//   },
//   {
//     id: uuidv4(),
//     title: "read books",
//     details: "read for 30mins",
//     isCompleted: false,
//   },
//   {
//     id: uuidv4(),
//     title: "watch movie",
//     details: "read for 30mins",
//     isCompleted: false,
//   },
// ];
function App() {
  return (
    <>
      <TodosProvider>
        <ToastProvider>
          <div className="flex flex-col justify-center h-screen">
            <ListTask />
          </div>
        </ToastProvider>
      </TodosProvider>
    </>
  );
}

export default App;
