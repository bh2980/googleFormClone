import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { addQuestion, copyQuestion, removeQuestion } from "./questionSlice";

interface DocsInterface {
  title: string;
  content: string;
  questionIDList: string[];
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

export const { editTitle, editContent } = docsSlice.actions;

const docsReducer = docsSlice.reducer;
export default docsReducer;
