import { configureStore } from "@reduxjs/toolkit";
import docsReducer from "./docsSlice";
import answerReducer from "./answerSlice";
import questionReducer from "./questionSlice";

export const store = configureStore({
  reducer: {
    docs: docsReducer,
    question: questionReducer,
    answer: answerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
