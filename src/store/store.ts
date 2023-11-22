import { configureStore } from "@reduxjs/toolkit";
import docsReducer from "./docsSlice";
import answerReducer from "./answerSlice";
import questionReducer from "./questionSlice";
import editBlockIDReducer from "./editBlockIDSlice";

export const store = configureStore({
  reducer: {
    docs: docsReducer,
    question: questionReducer,
    answer: answerReducer,
    editBlockID: editBlockIDReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
