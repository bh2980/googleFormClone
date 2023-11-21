import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { addQuestion, copyQuestion, removeQuestion } from "./questionSlice";

interface DocsInterface {
  title: string;
  content: string;
  questionIDList: string[];
}

interface DnDAction {
  fromIdx: number;
  toIdx: number;
}

const initialState: DocsInterface = {
  title: "",
  content: "",
  questionIDList: [],
};

const docsSlice = createSlice({
  name: "docs",
  initialState,
  reducers: {
    editTitle(state, action: PayloadAction<string>) {
      state.title = action.payload;
    },
    editContent(state, action: PayloadAction<string>) {
      state.content = action.payload;
    },
    editQuestionBlockOrder(state, action: PayloadAction<DnDAction>) {
      console.log("before", state.questionIDList);
      const moveQuestionID = state.questionIDList[action.payload.fromIdx];
      state.questionIDList.splice(action.payload.fromIdx, 1);
      state.questionIDList.splice(action.payload.toIdx, 0, moveQuestionID);
      console.log("after", state.questionIDList);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(removeQuestion, (state, action) => {
        console.log("docs에서", action.payload.questionID, "삭제");
        state.questionIDList = state.questionIDList.filter((qID) => qID !== action.payload.questionID);
      })
      .addCase(addQuestion, (state, action) => {
        console.log("docs에", action.payload.questionID, "추가");
        state.questionIDList.push(action.payload.questionID);
      })
      .addCase(copyQuestion, (state, action) => {
        const parentIdx = state.questionIDList.findIndex((qID) => qID === action.payload.parentQuestionID);
        state.questionIDList.splice(parentIdx + 1, 0, action.payload.questionID);
      });
  },
});

export const { editTitle, editContent, editQuestionBlockOrder } = docsSlice.actions;

const docsReducer = docsSlice.reducer;
export default docsReducer;
