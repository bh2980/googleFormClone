import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { removeAnswer } from "./answerSlice";

export type QuestionKindType = "short" | "long" | "radio" | "checkbox" | "dropdown";

export interface QuestionInterface {
  questionID: string;
  type: QuestionKindType;
  required: boolean;
  answerIDList: string[];
}

export type QuestionMap = {
  [key: string]: QuestionInterface;
};

const initialState: QuestionMap = {};

const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    setQuestion(state, action: PayloadAction<QuestionInterface>) {
      state[action.payload.questionID] = action.payload;
    },
    removeQuestion(state, action: PayloadAction<QuestionInterface>) {
      delete state[action.payload.questionID];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(removeAnswer, (state, action) => {
      console.log("테스트용", state, action);

      state[action.payload.questionID].answerIDList = state[action.payload.questionID].answerIDList.filter(
        (answerID) => answerID !== action.payload.answerID
      );
    });
  },
});

export const { setQuestion, removeQuestion } = questionSlice.actions;

const questionReducer = questionSlice.reducer;
export default questionReducer;
