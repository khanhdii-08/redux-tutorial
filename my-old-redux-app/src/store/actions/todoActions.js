// export const markComplete = () => {
//   const markCompleteAction = (dispatch) => {
//     dispatch({
//       type: "MARK_COMPLETE",
//       payload: "my payload",
//     });
//   };

import axios from "axios";
import { ADD_TODO, DELETE_TODO, GET_TODOS, MARK_COMPLETE } from "../types";

//   return markCompleteAction;
// };

export const getTodos = () => async (dispatch) => {
  try {
    const res = await axios.get(
      "https://jsonplaceholder.typicode.com/todos?_limit=3"
    );
    dispatch({
      type: GET_TODOS,
      payload: {
        todos: res.data,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const markComplete = (id) => (dispatch) => {
  dispatch({
    type: MARK_COMPLETE,
    payload: {
      id,
    },
  });
};

export const addTodo = (newTodo) => async (dispatch) => {
  await axios.post("https://jsonplaceholder.typicode.com/todos", newTodo);
  try {
    dispatch({
      type: ADD_TODO,
      payload: {
        todo: newTodo,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteTodo = (id) => async (dispatch) => {
  try {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
    dispatch({
      type: DELETE_TODO,
      payload: {
        id,
      },
    });
  } catch (error) {}
};
