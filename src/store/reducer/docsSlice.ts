import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { addQuestion, copyQuestion, removeQuestion } from "./questionSlice";
import { DnDAction } from "../../hook/useDnDList";

interface DocsInterface {
  title: string;
  content: string;
  editBlockID: string;
  questionIDList: string[];
}

const initialState: DocsInterface = {
  title: "",
  content: "",
  editBlockID: "title",
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
    changeEditBlockID(state, action: PayloadAction<string>) {
      state.editBlockID = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(removeQuestion, (state, action) => {
        const findDeleteIdx = state.questionIDList.findIndex((qID) => qID === action.payload.questionID);
        if (findDeleteIdx === state.questionIDList.length - 1)
          state.editBlockID = findDeleteIdx - 1 >= 0 ? state.questionIDList[findDeleteIdx - 1] : "title";
        else state.editBlockID = state.questionIDList[findDeleteIdx + 1];
        state.questionIDList = state.questionIDList.filter((qID) => qID !== action.payload.questionID);
      })
      .addCase(addQuestion, (state, action) => {
        state.questionIDList.push(action.payload.questionID);
        state.editBlockID = action.payload.questionID;
      })
      .addCase(copyQuestion, (state, action) => {
        const parentIdx = state.questionIDList.findIndex((qID) => qID === action.payload.parentQuestionID);
        state.questionIDList.splice(parentIdx + 1, 0, action.payload.questionID);
        state.editBlockID = action.payload.questionID;
      });
  },
});

export const { editTitle, editContent, editQuestionBlockOrder, changeEditBlockID } = docsSlice.actions;

const docsReducer = docsSlice.reducer;
export default docsReducer;
