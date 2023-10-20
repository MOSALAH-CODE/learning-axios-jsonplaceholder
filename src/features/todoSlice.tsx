import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

import axios from "axios";

interface ITodoApi {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface ITodo {
  userId: number;
  id: number;
  myTitle: string;
  myCompleted: boolean;
}

export const fetchTodos = createAsyncThunk<ITodo[]>(
  "todos/fetchTodos",
  async () => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/todos?_limit=10"
    );
    const todos: ITodoApi[] = response.data;
    return todos.map((todo) => ({
      userId: todo.userId,
      id: todo.id,
      myTitle: todo.title,
      myCompleted: todo.completed,
    })) as ITodo[];
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
    data: ITodo[];
    isLoading: boolean;
  },
  reducers: {
    deleteTodoLocal: (state, action) => {
      state.data = state.data.filter((todo) => todo.id !== action.payload);
    },
  },
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
      });
  },
});

export const { deleteTodoLocal } = todoSlice.actions;

export const selectTodos = (state: RootState) => state.todos.data;
export const selectIsLoading = (state: RootState) => state.todos.isLoading;

export default todoSlice.reducer;
