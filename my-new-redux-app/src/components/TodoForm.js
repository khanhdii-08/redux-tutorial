import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../store/reducers/todosSlice";

const TodoForm = () => {
  const [title, setTitle] = useState("");

  const dispatch = useDispatch();

  const changeTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addTodo(title));
    setTitle("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={title} onChange={changeTitle} />
        <input type="submit" value="Add" />
      </form>
    </div>
  );
};

export default TodoForm;
