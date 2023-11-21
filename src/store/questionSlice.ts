import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { addAnswer, removeAnswer } from "./answerSlice";
import { EDITOR_QUESTION_TYPE } from "../constants";

export interface QuestionInterface {
  questionID: string;
  type: EDITOR_QUESTION_TYPE;
  required: boolean;
  questionContent: string;
  answerIDList: string[];
  parentQuestionID: string | null;
}

export type QuestionMap = {
  [key: string]: QuestionInterface;
};

const initialState: QuestionMap = {};

const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    addQuestion(state, action: PayloadAction<QuestionInterface>) {
      state[action.payload.questionID] = action.payload;
    },
    editQuestion(state, action: PayloadAction<QuestionInterface>) {
      state[action.payload.questionID] = action.payload;
    },
    copyQuestion(state, action: PayloadAction<QuestionInterface>) {
      state[action.payload.questionID] = action.payload;
    },
    removeQuestion(state, action: PayloadAction<QuestionInterface>) {
      delete state[action.payload.questionID];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(removeAnswer, (state, action) => {
        console.log("question에서 answer 제거", action.payload.answerID);

        state[action.payload.questionID].answerIDList = state[action.payload.questionID].answerIDList.filter(
          (answerID) => answerID !== action.payload.answerID
        );
      })
      .addCase(addAnswer, (state, action) => {
        console.log("question에 answer 추가", action.payload.answerID);
        state[action.payload.questionID].answerIDList.push(action.payload.answerID);
      });
  },
});

export const { addQuestion, editQuestion, copyQuestion, removeQuestion } = questionSlice.actions;

const questionReducer = questionSlice.reducer;
export default questionReducer;