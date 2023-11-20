import { configureStore } from "@reduxjs/toolkit";
import docsReducer from "./docsSlice";

export const store = configureStore({
  reducer: {
    title: docsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
