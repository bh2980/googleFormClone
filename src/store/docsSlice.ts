import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { removeQuestion } from "./questionSlice";

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
    builder.addCase(removeQuestion, (state, action) => {
      console.log(action);
      state.questionIDList = state.questionIDList.filter((qID) => qID !== action.payload.questionID);
    });
  },
});

export const { editTitle, editContent } = docsSlice.actions;

const docsReducer = docsSlice.reducer;
export default docsReducer;
