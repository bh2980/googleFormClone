import { configureStore } from "@reduxjs/toolkit";
import docsReducer from "./reducer/docsSlice";
import answerReducer from "./reducer/answerSlice";
import questionReducer from "./reducer/questionSlice";

//slice에 순서는 extraReducer 실행 순서
export const store = configureStore({
  reducer: {
    answer: answerReducer,
    question: questionReducer,
    docs: docsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
