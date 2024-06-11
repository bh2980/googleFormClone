import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { addAnswer, removeAnswer } from './answerSlice';
import { EDITOR_QUESTION_TYPE } from '../../constants';
import { DnDAction } from '@google-form-clone/hooks';

export interface QuestionInterface {
  questionID: string;
  type: EDITOR_QUESTION_TYPE;
  required: boolean;
  questionContent: string;
  answerIDList: string[];
  parentQuestionID: string | null;
}

export interface AnswerDnDAction extends DnDAction {
  questionID: string;
}

export type QuestionMap = {
  [key: string]: QuestionInterface;
};

const initialState: QuestionMap = {};

const questionSlice = createSlice({
  name: 'question',
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
    editAnswerOrder(state, action: PayloadAction<AnswerDnDAction>) {
      console.log(action);
      const moveAnswerID = state[action.payload.questionID].answerIDList[action.payload.fromIdx];
      state[action.payload.questionID].answerIDList.splice(action.payload.fromIdx, 1);
      state[action.payload.questionID].answerIDList.splice(action.payload.toIdx, 0, moveAnswerID);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(removeAnswer, (state, action) => {
        state[action.payload.questionID].answerIDList = state[action.payload.questionID].answerIDList.filter(
          (answerID) => answerID !== action.payload.answerID
        );
      })
      .addCase(addAnswer, (state, action) => {
        state[action.payload.questionID].answerIDList.push(action.payload.answerID);
      });
  },
});

export const { addQuestion, editQuestion, copyQuestion, removeQuestion, editAnswerOrder } = questionSlice.actions;

const questionReducer = questionSlice.reducer;
export default questionReducer;
