import { createContext, useReducer, useContext } from "react";
import TodosReducers from "../reducers/TodosReducer";

export const TaskContext = createContext([]);
const TodosProvider = ({ children }) => {
  const [todos, todoDispatch] = useReducer(TodosReducers, []);
  return (
    <TaskContext.Provider value={{ todos: todos, dispatch: todoDispatch }}>
      {children}
    </TaskContext.Provider>
  );
};
export const useTodos = () => {
  return useContext(TaskContext);
};
export default TodosProvider;
