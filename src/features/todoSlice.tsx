import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

import axios from "axios";

export const fetchTodos = createAsyncThunk<Todo[]>(
  "todos/fetchTodos",
  async () => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/todos?_limit=10"
    );
    return response.data as Todo[];
  }
);

export const deleteTodo = createAsyncThunk<number, number>(
  "todos/deleteTodo",
  async (todoId) => {
    try {
      await axios.delete(
        `https://jsonplaceholder.typicode.com/todos/${todoId}`
      );
      return todoId;
    } catch (error) {
      throw error;
    }
  }
);

const todoSlice = createSlice({
  name: "todos",
  initialState: { data: [], isLoading: true } as {
    data: Todo[];
    isLoading: boolean;
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchTodos.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.data = state.data.filter((todo) => todo.id !== action.payload);
      });
  },
});

export const selectTodos = (state: RootState) => state.todos.data;
export const selectIsLoading = (state: RootState) => state.todos.isLoading;

export default todoSlice.reducer;
