import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AnswerInterface {
  answerID: string;
  content: string;
  questionID: string;
}

export type AnswerMap = {
  [key: string]: AnswerInterface;
};

const initialState: AnswerMap = {};

const answerSlice = createSlice({
  name: "answer",
  initialState,
  reducers: {
    addAnswer(state, action: PayloadAction<AnswerInterface>) {
      state[action.payload.answerID] = action.payload;
    },
    editAnswer(state, action: PayloadAction<AnswerInterface>) {
      state[action.payload.answerID] = action.payload;
    },
    removeAnswer(state, action: PayloadAction<AnswerInterface>) {
      delete state[action.payload.answerID];
    },
  },
});

export const { addAnswer, editAnswer, removeAnswer } = answerSlice.actions;

const answerReducer = answerSlice.reducer;
export default answerReducer;
