// store.js
import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/todoSlice";

const rootReducer = {
  todos: todoReducer,
};

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
