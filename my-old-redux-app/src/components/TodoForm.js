import React, { useState } from "react";
import { connect } from "react-redux";
import { addTodo } from "../store/actions/todoActions";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";

const TodoForm = ({ addTodo }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (title !== "") {
      const newTodo = {
        id: uuidv4(),
        title,
        completed: false,
      };

      // console.log(newTodo)
      addTodo(newTodo);
      setTitle("");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <input type="submit" value="Add" />
      </form>
    </div>
  );
};

TodoForm.propTypes = {
  addTodo: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, { addTodo })(TodoForm);
