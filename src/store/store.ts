import { configureStore } from "@reduxjs/toolkit";
import docsReducer from "./reducer/docsSlice";
import answerReducer from "./reducer/answerSlice";
import questionReducer from "./reducer/questionSlice";
import editBlockIDReducer from "./reducer/editBlockIDSlice";
import formStateReducer from "./reducer/formStateSlice";

export const store = configureStore({
  reducer: {
    docs: docsReducer,
    question: questionReducer,
    answer: answerReducer,
    editBlockID: editBlockIDReducer,
    formState: formStateReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
