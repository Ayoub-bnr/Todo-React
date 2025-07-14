import { v4 as uuidv4 } from "uuid";

export default function reducer(currentTodos, action) {
  switch (action.type) {
    case "added": {
      const newTask = {
        id: uuidv4(),
        title: action.payload.newTitle,
        details: "this is ayoub ",
        isCompleted: false,
      };
      const updatedTodos = [...currentTodos, newTask];
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }
    case "deleted": {
      const updatedTodos = currentTodos.filter(
        (t) => t.id !== action.payload.delTodo.id
      );
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }
    case "updated": {
      const updatedTodos = currentTodos.map((t) => {
        if (t.id == action.payload.upTodo.id) {
          return {
            ...t,
            title: action.payload.upTodo.title,
            details: action.payload.upTodo.details,
          };
        } else return t;
      });
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }
    case "get": {
      const storedTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
      return storedTodos;
    }
    case "btnCheck": {
      const updatedTodos = currentTodos.map((t) => {
        if (t.id == action.payload.id) {
          return { ...t, isCompleted: !t.isCompleted };
        }
        return t;
      });

      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }
    default: {
      throw Error(`Unknown action type: ${action.type}`);
    }
  }
}
