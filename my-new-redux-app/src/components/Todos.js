import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTodo,
  getTodos,
  markComplete,
  todosSelector,
} from "../store/reducers/todosSlice";
import TodoForm from "./TodoForm";

const Todos = () => {
  const dispatch = useDispatch();
  const todos = useSelector(todosSelector);

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  const toggleTodoCompleted = (todoId) => {
    dispatch(markComplete(todoId));
  };

  const toggleDeleteTodo = (todoId) => {
    // console.log(todoId);
    dispatch(deleteTodo(todoId));
  };

  return (
    <div className="todo-list">
      <TodoForm />
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className={todo.completed ? "completed" : ""}>
            {todo.title}
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={toggleTodoCompleted.bind(this, todo.id)}
            />
            <button onClick={toggleDeleteTodo.bind(this, todo.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todos;
