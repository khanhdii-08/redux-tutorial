import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import axios from "axios";

// Reducer Thunk

export const getTodos = createAsyncThunk("todos/todosFetched", async () => {
  const res = await axios.get(
    "https://jsonplaceholder.typicode.com/todos?_limit=5"
  );

  return res.data;
});

export const addTodo = createAsyncThunk("todos/todoAdded", async (title) => {
  const newTodo = {
    id: nanoid(),
    title,
    completed: false,
  };

  await axios.post("https://jsonplaceholder.typicode.com/todos", newTodo);

  return newTodo;
});

export const deleteTodo = createAsyncThunk(
  "todos/todoDeleted",
  async (todoId) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${todoId}`);
    return todoId;
  }
);

const todosSlice = createSlice({
  name: "todos",
  initialState: {
    allTodos: [],
  },

  reducers: {
    // addTodo: {
    //   reducer(state, action) {
    //     state.allTodos.unshift(action.payload);
    //   },
    //   prepare(title) {
    //     return {
    //       payload: {
    //         id: nanoid(),
    //         title,
    //         completed: false,
    //       },
    //     };
    //   },
    // },
    markComplete(state, action) {
      const todoId = action.payload;

      state.allTodos = state.allTodos.map((todo) => {
        if (todo.id === todoId) todo.completed = !todo.completed;
        return todo;
      });
    },
    // deleteTodo(state, action) {
    //   const todoId = action.payload;

    //   state.allTodos = state.allTodos.filter((todo) => todo.id !== todoId);
    // },

    // todosFetched(state, action) {
    //   state.allTodos = action.payload;
    // },
  },

  extraReducers: {
    [getTodos.pending]: (state, action) => {
      console.log("Fetching todos from backend ....");
    },
    [getTodos.fulfilled]: (state, action) => {
      console.log("Done");
      state.allTodos = action.payload;
    },
    [getTodos.rejected]: (state, action) => {
      console.log("Failed to get todos");
    },

    ////////

    [addTodo.pending]: (state, action) => {
      console.log("Fetching todos from backend ....");
    },
    [addTodo.fulfilled]: (state, action) => {
      state.allTodos.unshift(action.payload);
    },
    [addTodo.rejected]: (state, action) => {
      console.log("Failed to get todos");
    },

    ///////

    [deleteTodo.pending]: (state, action) => {
      console.log("Fetching todos from backend ....");
    },
    [deleteTodo.fulfilled]: (state, action) => {
      const todoId = action.payload;
      state.allTodos = state.allTodos.filter((todo) => todo.id !== todoId);
    },
    [deleteTodo.rejected]: (state, action) => {
      console.log("Failed to get todos");
    },
  },
});

// export const getTodos = () => {
//   const getTodosAsync = async (dispatch) => {
//     try {
//       const res = await axios.get(
//         "https://jsonplaceholder.typicode.com/todos?_limit=5"
//       );
//       dispatch(todosFetched(res.data));
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   return getTodosAsync;
// };

// export const getTodos = () => async (dispatch) => {
//   try {
//     const res = await axios.get(
//       "https://jsonplaceholder.typicode.com/todos?_limit=5"
//     );
//     dispatch(todosFetched(res.data));
//   } catch (error) {
//     console.log(error);
//   }
// };

const todosReducer = todosSlice.reducer;

export const todosSelector = (state) => state.todosReducer.allTodos;

export const { markComplete, todosFetched } = todosSlice.actions;

export default todosReducer;
