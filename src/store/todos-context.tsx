import React, { useState } from "react";
import Todo from "../models/todo";

type TodosCtxAlias = {
  items: Todo[];
  addTodo: (text: string) => void;
  removeTodo: (id: string) => void;
}

export const TodosContext = React.createContext<TodosCtxAlias>({
  items:[],
  addTodo: () => {},
  removeTodo: (id: string) => {}
});

const TodosContextProvider: React.FC = (props) => {
  const [ todos, setTodos] = useState<Todo[]>([]);

  const addTodoHandler = (text: string) => {
    const newTodo = new Todo(text);
    setTodos((currentTodos) => {
      return currentTodos.concat(newTodo);
    });
  };

  const removeTodoHandler = (todoId: string) => {
    setTodos((currentTodos) => {
      return currentTodos.filter(todo => todo.id !== todoId)
    });
  };

  const contextValue: TodosCtxAlias = {
    items: todos,
    addTodo: addTodoHandler,
    removeTodo: removeTodoHandler
  };

  return <TodosContext.Provider value={contextValue}>
    {props.children}
  </TodosContext.Provider>
}

export default TodosContextProvider;